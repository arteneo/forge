
import { DialogActions, type DialogActionsSpecificProps } from "../../components/Dialog/DialogActions";
import { DialogBatchContent, type DialogBatchContentSpecificProps } from "../../components/Dialog/DialogBatchContent";
import { DialogTitle, type DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import { DialogBatchProvider, DialogBatchProviderProps } from "../../contexts/DialogBatch";

type DialogBatchProps = DialogTitleSpecificProps &
    DialogBatchContentSpecificProps &
    DialogActionsSpecificProps &
    Omit<DialogBatchProviderProps, "children"> &
    Omit<DialogProviderProps, "children">;

const DialogBatch = ({
    results,
    children,
    batchProgressProps,
    title,
    titleVariables,
    onClose,
    actions,
    ...props
}: DialogBatchProps) => {
    return (
        <DialogProvider {...{ onClose, ...props }}>
            <DialogBatchProvider {...{ results }}>
                <DialogTitle {...{ title, titleVariables }} />
                <DialogBatchContent {...{ children, batchProgressProps }} />
                <DialogActions {...{ actions }} />
            </DialogBatchProvider>
        </DialogProvider>
    );
};

export { DialogBatch, type DialogBatchProps };
