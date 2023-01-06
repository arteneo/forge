import React from "react";
import { AxiosResponse } from "axios";
import Optional from "../../definitions/Optional";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import { BatchResultInterface, DialogBatchProvider, DialogBatchProviderProps } from "../../contexts/DialogBatch";
import DialogTitle, { DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import DialogBatchContent, { DialogBatchContentSpecificProps } from "../../components/Dialog/DialogBatchContent";
import DialogActions from "../../components/Dialog/DialogActions";
import DialogBatchButtonSubmit, { DialogBatchButtonSubmitProps } from "../../components/Dialog/DialogBatchButtonSubmit";
import BindDialogBatchForm, { BindDialogBatchFormProps } from "../../components/Dialog/BindDialogBatchForm";

type DialogBatchFormFormProps = Optional<BindDialogBatchFormProps, "children">;

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
    ...props
}: DialogBatchFormProps) => {
    return (
        <DialogProvider {...{ onClose, ...props }}>
            <DialogBatchProvider {...{ results }}>
                <BindDialogBatchForm {...formProps}>
                    <DialogTitle {...{ title, titleVariables }} />
                    <DialogBatchContent {...{ children, batchProgressProps }} />
                    <DialogActions
                        {...{
                            actions: <DialogBatchButtonSubmit {...submitProps} />,
                        }}
                    />
                </BindDialogBatchForm>
            </DialogBatchProvider>
        </DialogProvider>
    );
};

export default DialogBatchForm;
export { DialogBatchFormProps };
