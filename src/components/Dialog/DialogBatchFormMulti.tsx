import React from "react";
import { AxiosResponse } from "axios";
import Optional from "../../definitions/Optional";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import { BatchResultInterface, DialogBatchProvider, DialogBatchProviderProps } from "../../contexts/DialogBatch";
import DialogTitle, { DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import DialogBatchContent, { DialogBatchContentSpecificProps } from "../../components/Dialog/DialogBatchContent";
import DialogActions from "../../components/Dialog/DialogActions";
import DialogBatchButtonSubmit, { DialogBatchButtonSubmitProps } from "../../components/Dialog/DialogBatchButtonSubmit";
import BindDialogBatchFormMulti, {
    BindDialogBatchFormMultiProps,
} from "../../components/Dialog/BindDialogBatchFormMulti";

type DialogBatchFormMultiFormProps = Optional<BindDialogBatchFormMultiProps, "children">;

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
    ...props
}: DialogBatchFormMultiProps) => {
    return (
        <DialogProvider {...{ onClose, ...props }}>
            <DialogBatchProvider {...{ results }}>
                <BindDialogBatchFormMulti {...formProps}>
                    <DialogTitle {...{ title, titleVariables }} />
                    <DialogBatchContent {...{ children, batchProgressProps }} />
                    <DialogActions
                        {...{
                            actions: <DialogBatchButtonSubmit {...submitProps} />,
                        }}
                    />
                </BindDialogBatchFormMulti>
            </DialogBatchProvider>
        </DialogProvider>
    );
};

export default DialogBatchFormMulti;
export { DialogBatchFormMultiProps };
