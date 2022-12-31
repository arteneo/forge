import React from "react";
import { AxiosResponse } from "axios";
import { Check } from "@mui/icons-material";
import ButtonMultiEndpoint, { ButtonMultiEndpointProps } from "../../components/Common/ButtonMultiEndpoint";
import { useDialogBatch, BatchResultInterface } from "../../contexts/DialogBatch";
import { useDialog } from "../../contexts/Dialog";
import ResultInterface from "../../components/Table/definitions/ResultInterface";
import EndpointType from "../../definitions/EndpointType";

interface DialogBatchButtonMultiEndpointProps extends Omit<ButtonMultiEndpointProps, "endpoints"> {
    endpoint: (result: ResultInterface) => EndpointType;
    onCatchProcessResponse?: (result: ResultInterface, response: AxiosResponse) => BatchResultInterface;
}

const DialogBatchButtonMultiEndpoint = ({
    label = "action.confirm",
    color = "success",
    variant = "contained",
    endIcon = <Check />,
    endpoint,
    onCatchProcessResponse = ({ id, representation }, response) => ({
        id,
        representation,
        ...response.data,
    }),
    ...props
}: DialogBatchButtonMultiEndpointProps) => {
    const { initialized } = useDialog();
    const { results, finished, setFinished, setProcessing, setBatchResults } = useDialogBatch();

    const endpoints = results.map((result) => endpoint(result));

    return (
        <ButtonMultiEndpoint
            {...{
                endpoints,
                label,
                color,
                variant,
                endIcon,
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
                onFinish: (defaultOnFinish, setLoading, cancelled) => {
                    const internalDefaultOnFinish = () => {
                        defaultOnFinish();

                        if (!cancelled) {
                            setProcessing(false);
                            setFinished(true);
                        }
                    };

                    if (typeof props.onFinish !== "undefined") {
                        props.onFinish(internalDefaultOnFinish, setLoading, cancelled);
                        return;
                    }

                    internalDefaultOnFinish();
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
                        props.onSuccess(internalDefaultOnSuccess, key, response, setLoading);
                        return;
                    }

                    internalDefaultOnSuccess();
                },
                onCatch: (defaultOnCatch, key, error, setLoading, cancelled) => {
                    const internalDefaultOnCatch = () => {
                        if (cancelled) {
                            // When cancelled execute defaultOnCatch so it can cancel remaining requests
                            defaultOnCatch();
                            return;
                        }

                        if (typeof error?.response !== "undefined" && error?.response?.status === 409) {
                            setBatchResults((batchResults) => [
                                ...batchResults,
                                onCatchProcessResponse(results[key], error.response as AxiosResponse),
                            ]);

                            return;
                        }

                        setBatchResults((batchResults) => [
                            ...batchResults,
                            {
                                id: results[key].id,
                                representation: results[key].representation,
                                status: "error",
                                message: "dialogBatchResults.tooltip.errorMessageUnexpected",
                            },
                        ]);
                    };

                    if (typeof props.onCatch !== "undefined") {
                        props.onCatch(internalDefaultOnCatch, key, error, setLoading, cancelled);
                        return;
                    }

                    internalDefaultOnCatch();
                },
            }}
        />
    );
};

export default DialogBatchButtonMultiEndpoint;
export { DialogBatchButtonMultiEndpointProps };
