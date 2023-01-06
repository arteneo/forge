import React from "react";
import { AxiosResponse } from "axios";
import Form, { FormProps } from "../../components/Form/components/Form";
import { BatchResultInterface, useDialogBatch } from "../../contexts/DialogBatch";
import { useDialog } from "../../contexts/Dialog";

interface BindDialogBatchFormProps extends FormProps {
    processResponse?: (response: AxiosResponse) => BatchResultInterface[];
}

const BindDialogBatchForm = ({ processResponse = (response) => response.data, ...props }: BindDialogBatchFormProps) => {
    const { onClose } = useDialog();
    const { setFinished, setProcessing, setBatchResults } = useDialogBatch();

    return (
        <Form
            {...{
                ...props,
                onSubmitStart: (defaultOnSubmitStart, setLoading) => {
                    const internalDefaultOnSubmitStart = () => {
                        setProcessing(true);
                        setFinished(false);
                        setBatchResults([]);
                    };

                    if (typeof props?.onSubmitStart !== "undefined") {
                        props.onSubmitStart(internalDefaultOnSubmitStart, setLoading);
                        return;
                    }

                    internalDefaultOnSubmitStart();
                },
                onSubmitSuccess: (defaultOnSubmitSuccess, helpers, response) => {
                    const internalDefaultOnSubmitSuccess = () => {
                        helpers.setSubmitting(false);
                        setProcessing(false);
                        setFinished(true);
                        setBatchResults(processResponse(response));
                    };

                    if (typeof props?.onSubmitSuccess !== "undefined") {
                        props.onSubmitSuccess(internalDefaultOnSubmitSuccess, helpers, response);
                        return;
                    }

                    internalDefaultOnSubmitSuccess();
                },
                onSubmitCatch: (defaultOnSubmitCatch, helpers, error) => {
                    const internalDefaultOnSubmitCatch = () => {
                        defaultOnSubmitCatch();

                        if (error?.response?.status !== 400) {
                            onClose();
                        }
                    };

                    if (typeof props.onSubmitCatch !== "undefined") {
                        props.onSubmitCatch(internalDefaultOnSubmitCatch, helpers, error);
                        return;
                    }

                    internalDefaultOnSubmitCatch();
                },
            }}
        />
    );
};

export default BindDialogBatchForm;
export { BindDialogBatchFormProps };
