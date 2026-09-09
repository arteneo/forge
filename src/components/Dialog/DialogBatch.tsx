import React from "react";

import DialogActions, { DialogActionsSpecificProps } from "../../components/Dialog/DialogActions";
import DialogBatchContent, { DialogBatchContentSpecificProps } from "../../components/Dialog/DialogBatchContent";
import DialogTitle, { DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
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

export default DialogBatch;
export { DialogBatchProps };
