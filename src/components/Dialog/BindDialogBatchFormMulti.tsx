import React from "react";
import { AxiosError } from "axios";
import FormMulti, { FormMultiProps } from "../../components/Form/components/FormMulti";
import { FormikValues } from "formik";
import { BatchResultInterface, mapRequestExecutionException, useDialogBatch } from "../../contexts/DialogBatch";
import ResultInterface from "../../components/Table/definitions/ResultInterface";
import EndpointType from "../../definitions/EndpointType";
import { RequestExecutionExceptionType } from "../../definitions/RequestExecutionException";

type BatchFormEndpointType = (result: ResultInterface, values: FormikValues) => EndpointType;

interface BindDialogBatchFormMultiProps extends Omit<FormMultiProps, "endpoints"> {
    endpoint: BatchFormEndpointType;
    resultDenyKey?: string;
    onSubmitCatchProcessResponse?: (
        result: ResultInterface,
        // eslint-disable-next-line
        error: AxiosError<any>,
        values: FormikValues
    ) => BatchResultInterface;
}

const BindDialogBatchFormMulti = ({
    endpoint,
    resultDenyKey,
    onSubmitCatchProcessResponse = ({ id, representation }, error) => {
        if (error?.response?.status === 400) {
            return {
                id: id,
                representation: representation,
                status: "error",
                messages: [{ message: "dialogBatchResults.tooltip.errorMessage400", severity: "error" }],
            };
        }

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
}: BindDialogBatchFormMultiProps) => {
    const { results, setFinished, setProcessing, setBatchResults } = useDialogBatch();

    const deniedResults = resultDenyKey
        ? results.filter((result) => typeof result.deny?.[resultDenyKey] !== "undefined")
        : [];
    const allowedResults = resultDenyKey
        ? results.filter((result) => typeof result.deny?.[resultDenyKey] === "undefined")
        : results;

    const endpoints = allowedResults.map((allowedResult) => (values: FormikValues) => endpoint(allowedResult, values));

    return (
        <FormMulti
            {...{
                endpoints,
                ...props,
                onSubmitStart: (defaultOnSubmitStart, values, helpers) => {
                    const internalDefaultOnSubmitStart = () => {
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

                    if (typeof props?.onSubmitStart !== "undefined") {
                        props.onSubmitStart(internalDefaultOnSubmitStart, values, helpers);
                        return;
                    }

                    internalDefaultOnSubmitStart();
                },
                onSubmitSuccess: (defaultOnSubmitSuccess, response, values, helpers, key) => {
                    const internalDefaultOnSubmitSuccess = () => {
                        setBatchResults((batchResults) => [
                            ...batchResults,
                            {
                                id: allowedResults[key].id,
                                representation: allowedResults[key].representation,
                                status: "success",
                            },
                        ]);
                    };

                    if (typeof props?.onSubmitSuccess !== "undefined") {
                        props.onSubmitSuccess(internalDefaultOnSubmitSuccess, response, values, helpers, key);
                        return;
                    }

                    internalDefaultOnSubmitSuccess();
                },
                onSubmitCatch: (defaultOnSubmitCatch, error, values, helpers, key, cancelled) => {
                    const internalDefaultOnSubmitCatch = () => {
                        if (cancelled) {
                            // When cancelled execute defaultOnCatch so it can cancel remaining requests
                            defaultOnSubmitCatch();
                            return;
                        }

                        setBatchResults((batchResults) => [
                            ...batchResults,
                            onSubmitCatchProcessResponse(allowedResults[key], error, values),
                        ]);
                    };

                    if (typeof props.onSubmitCatch !== "undefined") {
                        props.onSubmitCatch(internalDefaultOnSubmitCatch, error, values, helpers, key, cancelled);
                        return;
                    }

                    internalDefaultOnSubmitCatch();
                },
                onSubmitFinish: (defaultOnSubmitFinish, values, helpers, cancelled) => {
                    const internalDefaultOnSubmitFinish = () => {
                        defaultOnSubmitFinish();

                        if (!cancelled) {
                            setProcessing(false);
                            setFinished(true);
                        }
                    };

                    if (typeof props.onSubmitFinish !== "undefined") {
                        props.onSubmitFinish(internalDefaultOnSubmitFinish, values, helpers, cancelled);
                        return;
                    }

                    internalDefaultOnSubmitFinish();
                },
            }}
        />
    );
};

export default BindDialogBatchFormMulti;
export { BatchFormEndpointType, BindDialogBatchFormMultiProps };
