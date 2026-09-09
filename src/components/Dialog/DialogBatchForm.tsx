import { AxiosResponse } from "axios";

import { BindDialogBatchForm, type BindDialogBatchFormProps } from "../../components/Dialog/BindDialogBatchForm";
import { DialogActions } from "../../components/Dialog/DialogActions";
import { DialogBatchButtonSubmit, type DialogBatchButtonSubmitProps } from "../../components/Dialog/DialogBatchButtonSubmit";
import { DialogBatchContent, type DialogBatchContentSpecificProps } from "../../components/Dialog/DialogBatchContent";
import { DialogTitle, type DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import { BatchResultInterface, DialogBatchProvider, DialogBatchProviderProps } from "../../contexts/DialogBatch";
import { Optional } from "../../definitions/Optional";

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

export { DialogBatchForm, type DialogBatchFormProps };
