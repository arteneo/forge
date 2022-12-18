import React from "react";
import Optional from "../../definitions/Optional";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import { DialogBatchProvider, DialogBatchProviderProps } from "../../contexts/DialogBatch";
import DialogTitle, { DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import DialogBatchContent, { DialogBatchContentSpecificProps } from "../../components/Dialog/DialogBatchContent";
import DialogActions, { DialogActionsSpecificProps } from "../../components/Dialog/DialogActions";

type DialogBatchProps = DialogTitleSpecificProps &
    DialogBatchContentSpecificProps &
    DialogActionsSpecificProps &
    DialogBatchProviderProps &
    Optional<DialogProviderProps, "children">;

const DialogBatch = ({
    results,
    endpoint,
    children,
    title,
    titleVariables,
    onClose,
    actions,
    ...props
}: DialogBatchProps) => {
    return (
        <DialogProvider {...{ onClose, ...props }}>
            <DialogBatchProvider {...{ results, endpoint }}>
                <DialogTitle {...{ title, titleVariables }} />
                <DialogBatchContent {...{ children }} />
                <DialogActions {...{ actions }} />
            </DialogBatchProvider>
        </DialogProvider>
    );
};

export default DialogBatch;
export { DialogBatchProps };
