import React from "react";
import { Check } from "@mui/icons-material";
import Optional from "../../definitions/Optional";
import ButtonBatchEndpoint, { ButtonBatchEndpointProps } from "../../components/Common/ButtonBatchEndpoint";
import { useDialogBatch } from "../../contexts/DialogBatch";
import { useDialog } from "../../contexts/Dialog";

type DialogButtonBatchEndpointProps = Optional<ButtonBatchEndpointProps, "endpoints">;

const DialogButtonBatchEndpoint = ({
    label = "action.confirm",
    color = "success",
    variant = "contained",
    endIcon = <Check />,
    ...props
}: DialogButtonBatchEndpointProps) => {
    const { initialized } = useDialog();
    const { results, endpoint, finished, setFinished, setProcessing, setBatchResults } = useDialogBatch();

    return (
        <ButtonBatchEndpoint
            {...{
                endpoints: results.map((result) => endpoint(result)),
                label,
                color,
                variant,
                endIcon,
                onStart: (defaultOnStart) => {
                    // TODO Add option to override
                    defaultOnStart();
                    setProcessing(true);
                    setFinished(false);
                    setBatchResults([]);
                },
                onFinish: (defaultOnFinish) => {
                    // TODO Add option to override
                    defaultOnFinish();
                    setProcessing(false);
                    setFinished(true);
                },
                ...props,
                disabled: initialized && !finished ? props.disabled : true,
                onSuccess: (defaultOnSuccess, key, response, setLoading) => {
                    const internalDefaultOnSuccess = () => {
                        setBatchResults((batchResults) => [
                            ...batchResults,
                            {
                                id: results[key].id,
                                representation: results[key].representation,
                                status: "success",
                            },
                        ]);
                    };

                    if (typeof props.onSuccess !== "undefined") {
                        props.onSuccess(defaultOnSuccess, key, response, setLoading);
                        return;
                    }

                    internalDefaultOnSuccess();
                },
                onCatch: (defaultOnCatch, key, error, setLoading) => {
                    const internalDefaultOnCatch = () => {
                        setBatchResults((batchResults) => [
                            ...batchResults,
                            {
                                id: results[key].id,
                                representation: results[key].representation,
                                // TODO
                                status: key === 0 ? "skipped" : "error",
                                message: "dialogBatchProgress.tooltip.errorMessage",
                                messageVariables: {
                                    message: "Magic!",
                                },
                                // TODO Messages
                            },
                        ]);
                    };

                    if (typeof props.onCatch !== "undefined") {
                        props.onCatch(defaultOnCatch, key, error, setLoading);
                        return;
                    }

                    internalDefaultOnCatch();
                },
            }}
        />
    );
};

export default DialogButtonBatchEndpoint;
export { DialogButtonBatchEndpointProps };
