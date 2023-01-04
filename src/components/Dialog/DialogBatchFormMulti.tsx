import React from "react";
import { AxiosResponse } from "axios";
import FormMulti, { FormMultiProps } from "../../components/Form/components/FormMulti";
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

type DialogBatchFormMultiFormProps = Optional<FormMultiProps, "children">;

type InternalDialogBatchFormMultiProps = DialogTitleSpecificProps &
    DialogBatchContentSpecificProps &
    Omit<DialogBatchProviderProps, "children"> &
    Omit<DialogProviderProps, "children">;

interface DialogBatchFormMultiProps extends InternalDialogBatchFormMultiProps {
    formProps: DialogBatchFormMultiFormProps;
    processResponse?: (response: AxiosResponse) => BatchResultInterface[];
    submitProps?: DialogBatchButtonSubmitProps;
}

const DialogBatchFormMulti = ({
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
}: DialogBatchFormMultiProps) => {
    return (
        <DialogProvider {...{ onClose, ...props }}>
            <DialogBatchProvider {...{ results }}>
                <DialogBatchContext.Consumer>
                    {({ setFinished, setProcessing, setBatchResults }) => (
                        <FormMulti
                            {...{
                                ...formProps,
                                // onSubmitStart: (defaultOnSubmitStart, setLoading) => {
                                //     const internalDefaultOnSubmitStart = () => {
                                //         setProcessing(true);
                                //         setFinished(false);
                                //         setBatchResults([]);
                                //     };

                                //     if (typeof formProps?.onSubmitStart !== "undefined") {
                                //         formProps.onSubmitStart(internalDefaultOnSubmitStart, setLoading);
                                //         return;
                                //     }

                                //     internalDefaultOnSubmitStart();
                                // },
                                // onSubmitSuccess: (defaultOnSubmitSuccess, helpers, response) => {
                                //     const internalDefaultOnSubmitSuccess = () => {
                                //         helpers.setSubmitting(false);
                                //         setProcessing(false);
                                //         setFinished(true);
                                //         setBatchResults(processResponse(response));
                                //     };

                                //     if (typeof formProps?.onSubmitSuccess !== "undefined") {
                                //         formProps.onSubmitSuccess(internalDefaultOnSubmitSuccess, helpers, response);
                                //         return;
                                //     }

                                //     internalDefaultOnSubmitSuccess();
                                // },
                                // onSubmitCatch: (defaultOnSubmitCatch, helpers, error) => {
                                //     const internalDefaultOnSubmitCatch = () => {
                                //         defaultOnSubmitCatch();

                                //         if (error?.response?.status !== 400) {
                                //             onClose();
                                //         }
                                //     };

                                //     if (typeof formProps.onSubmitCatch !== "undefined") {
                                //         formProps.onSubmitCatch(internalDefaultOnSubmitCatch, helpers, error);
                                //         return;
                                //     }

                                //     internalDefaultOnSubmitCatch();
                                // },
                            }}
                        >
                            <DialogTitle {...{ title, titleVariables }} />
                            <DialogBatchContent {...{ children, batchProgressProps }} />
                            <DialogActions
                                {...{
                                    actions: <DialogBatchButtonSubmit {...submitProps} />,
                                }}
                            />
                        </FormMulti>
                    )}
                </DialogBatchContext.Consumer>
            </DialogBatchProvider>
        </DialogProvider>
    );
};

export default DialogBatchFormMulti;
export { DialogBatchFormMultiProps };
