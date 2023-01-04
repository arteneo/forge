import React from "react";
import { AxiosResponse } from "axios";
import Form, { FormProps } from "../../components/Form/components/Form";
import Optional from "../../definitions/Optional";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import {
    BatchResultInterface,
    DialogBatchContext,
    DialogBatchProvider,
    DialogBatchProviderProps,
} from "../../contexts/DialogBatch";
import DialogTitle, { DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import DialogBatchContent, { DialogBatchContentSpecificProps } from "../../components/Dialog/DialogBatchContent";
import DialogActions from "../../components/Dialog/DialogActions";
import DialogBatchButtonSubmit, { DialogBatchButtonSubmitProps } from "../../components/Dialog/DialogBatchButtonSubmit";

type DialogBatchFormFormProps = Optional<FormProps, "children">;

type InternalDialogBatchFormProps = DialogTitleSpecificProps &
    DialogBatchContentSpecificProps &
    Omit<DialogBatchProviderProps, "children"> &
    Omit<DialogProviderProps, "children">;

interface DialogBatchFormProps extends InternalDialogBatchFormProps {
    formProps: DialogBatchFormFormProps;
    processResponse?: (response: AxiosResponse) => BatchResultInterface[];
    submitProps?: DialogBatchButtonSubmitProps;
}

const DialogBatchForm = ({
    results,
    children,
    batchProgressProps,
    title,
    titleVariables,
    onClose,
    formProps,
    submitProps,
    processResponse = (response) => response.data,
    ...props
}: DialogBatchFormProps) => {
    return (
        <DialogProvider {...{ onClose, ...props }}>
            <DialogBatchProvider {...{ results }}>
                <DialogBatchContext.Consumer>
                    {({ setFinished, setProcessing, setBatchResults }) => (
                        <Form
                            {...{
                                ...formProps,
                                onSubmitStart: (defaultOnSubmitStart, setLoading) => {
                                    const internalDefaultOnSubmitStart = () => {
                                        setProcessing(true);
                                        setFinished(false);
                                        setBatchResults([]);
                                    };

                                    if (typeof formProps?.onSubmitStart !== "undefined") {
                                        formProps.onSubmitStart(internalDefaultOnSubmitStart, setLoading);
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

                                    if (typeof formProps?.onSubmitSuccess !== "undefined") {
                                        formProps.onSubmitSuccess(internalDefaultOnSubmitSuccess, helpers, response);
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

                                    if (typeof formProps.onSubmitCatch !== "undefined") {
                                        formProps.onSubmitCatch(internalDefaultOnSubmitCatch, helpers, error);
                                        return;
                                    }

                                    internalDefaultOnSubmitCatch();
                                },
                            }}
                        >
                            <DialogTitle {...{ title, titleVariables }} />
                            <DialogBatchContent {...{ children, batchProgressProps }} />
                            <DialogActions
                                {...{
                                    actions: <DialogBatchButtonSubmit {...submitProps} />,
                                }}
                            />
                        </Form>
                    )}
                </DialogBatchContext.Consumer>
            </DialogBatchProvider>
        </DialogProvider>
    );
};

export default DialogBatchForm;
export { DialogBatchFormProps };
