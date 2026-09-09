import { AxiosResponse } from "axios";

import {
    BindDialogBatchFormMulti,
    type BindDialogBatchFormMultiProps,
} from "../../components/Dialog/BindDialogBatchFormMulti";
import { DialogActions } from "../../components/Dialog/DialogActions";
import {
    DialogBatchButtonSubmit,
    type DialogBatchButtonSubmitProps,
} from "../../components/Dialog/DialogBatchButtonSubmit";
import { DialogBatchContent, type DialogBatchContentSpecificProps } from "../../components/Dialog/DialogBatchContent";
import { DialogTitle, type DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import { BatchResultInterface, DialogBatchProvider, DialogBatchProviderProps } from "../../contexts/DialogBatch";
import { Optional } from "../../definitions/Optional";

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

export { DialogBatchFormMulti, type DialogBatchFormMultiProps };
