import React from "react";
import { AxiosError } from "axios";
import { Check } from "@mui/icons-material";
import ButtonMultiEndpoint, { ButtonMultiEndpointProps } from "../../components/Common/ButtonMultiEndpoint";
import { useDialogBatch, BatchResultInterface, mapRequestExecutionException } from "../../contexts/DialogBatch";
import { useDialog } from "../../contexts/Dialog";
import ResultInterface from "../../components/Table/definitions/ResultInterface";
import EndpointType from "../../definitions/EndpointType";
import { RequestExecutionExceptionType } from "../../definitions/RequestExecutionException";

interface DialogBatchButtonMultiEndpointProps extends Omit<ButtonMultiEndpointProps, "endpoints"> {
    endpoint: (result: ResultInterface) => EndpointType;
    resultDenyKey?: string;
    onCatchProcessResponse?: (result: ResultInterface, response: AxiosError) => BatchResultInterface;
}

const DialogBatchButtonMultiEndpoint = ({
    label = "action.confirm",
    color = "success",
    variant = "contained",
    endIcon = <Check />,
    endpoint,
    resultDenyKey,
    onCatchProcessResponse = ({ id, representation }, error) => {
        if (error?.response?.status !== 409) {
            return {
                id: id,
                representation: representation,
                status: "error",
                messages: [{ message: "dialogBatchResults.tooltip.errorMessageUnexpected", severity: "error" }],
            };
        }

        return mapRequestExecutionException(id, representation, error.response.data as RequestExecutionExceptionType);
    },
    ...props
}: DialogBatchButtonMultiEndpointProps) => {
    const { initialized } = useDialog();
    const { results, finished, setFinished, setProcessing, setBatchResults } = useDialogBatch();

    const deniedResults = resultDenyKey
        ? results.filter((result) => typeof result.deny?.[resultDenyKey] !== "undefined")
        : [];
    const allowedResults = resultDenyKey
        ? results.filter((result) => typeof result.deny?.[resultDenyKey] === "undefined")
        : results;

    const endpoints = allowedResults.map((allowedResult) => endpoint(allowedResult));

    return (
        <ButtonMultiEndpoint
            {...{
                endpoints,
                label,
                color,
                variant,
                endIcon,
                ...props,
                disabled: initialized && !finished ? props.disabled : true,
                onStart: (defaultOnStart, setLoading) => {
                    const internalDefaultOnStart = () => {
                        setLoading(true);
                        setProcessing(true);
                        setFinished(false);
                        setBatchResults(
                            deniedResults.map((deniedResult) => ({
                                id: deniedResult.id,
                                representation: deniedResult.representation,
                                status: "skipped",
                                message: deniedResult.deny?.[resultDenyKey as string],
                            }))
                        );
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
                onSuccess: (defaultOnSuccess, key, response, setLoading) => {
                    const internalDefaultOnSuccess = () => {
                        setBatchResults((batchResults) => [
                            ...batchResults,
                            {
                                id: allowedResults[key].id,
                                representation: allowedResults[key].representation,
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

                        setBatchResults((batchResults) => [
                            ...batchResults,
                            onCatchProcessResponse(allowedResults[key], error),
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
