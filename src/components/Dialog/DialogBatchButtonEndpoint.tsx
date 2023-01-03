import React from "react";
import { AxiosResponse } from "axios";
import { Check } from "@mui/icons-material";
import ButtonEndpoint, { ButtonEndpointProps } from "../../components/Common/ButtonEndpoint";
import { useDialogBatch, BatchResultInterface } from "../../contexts/DialogBatch";
import { useDialog } from "../../contexts/Dialog";
import { mergeEndpoint } from "../../utilities/merge";

interface DialogBatchButtonEndpointProps extends ButtonEndpointProps {
    processResponse?: (response: AxiosResponse) => BatchResultInterface[];
}

const DialogBatchButtonEndpoint = ({
    processResponse = (response) => response.data,
    label = "action.confirm",
    color = "success",
    variant = "contained",
    endIcon = <Check />,
    endpoint,
    ...props
}: DialogBatchButtonEndpointProps) => {
    const { onClose, initialized } = useDialog();
    const { finished, setFinished, setProcessing, setBatchResults } = useDialogBatch();

    return (
        <ButtonEndpoint
            {...{
                label,
                color,
                variant,
                endIcon,
                endpoint: mergeEndpoint({ method: "post" }, endpoint),
                ...props,
                disabled: initialized && !finished ? props.disabled : true,
                onStart: (defaultOnStart, setLoading) => {
                    const internalDefaultOnStart = () => {
                        setLoading(true);
                        setProcessing(true);
                        setFinished(false);
                        setBatchResults([]);
                    };

                    if (typeof props.onStart !== "undefined") {
                        props.onStart(internalDefaultOnStart, setLoading);
                        return;
                    }

                    internalDefaultOnStart();
                },
                onSuccess: (defaultOnSuccess, response, setLoading) => {
                    const internalDefaultOnSuccess = () => {
                        setLoading(false);
                        setProcessing(false);
                        setFinished(true);
                        setBatchResults(processResponse(response));
                    };

                    if (typeof props.onSuccess !== "undefined") {
                        props.onSuccess(internalDefaultOnSuccess, response, setLoading);
                        return;
                    }

                    internalDefaultOnSuccess();
                },
                onCatch: (defaultOnCatch, error, setLoading) => {
                    const internalDefaultOnCatch = () => {
                        defaultOnCatch();
                        onClose();
                        setProcessing(false);
                        setFinished(true);
                    };

                    if (typeof props.onCatch !== "undefined") {
                        props.onCatch(internalDefaultOnCatch, error, setLoading);
                        return;
                    }

                    internalDefaultOnCatch();
                },
            }}
        />
    );
};

export default DialogBatchButtonEndpoint;
export { DialogBatchButtonEndpointProps };
