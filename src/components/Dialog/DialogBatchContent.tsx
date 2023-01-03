import React from "react";
import { DialogContent as MuiDialogContent, DialogContentProps as MuiDialogContentProps } from "@mui/material";
import { useDialog } from "../../contexts/Dialog";
import DialogContentLoader from "../../components/Dialog/DialogContentLoader";
import DialogBatchProgress, { DialogBatchProgressProps } from "../../components/Dialog/DialogBatchProgress";
import DialogBatchResults from "../../components/Dialog/DialogBatchResults";
import ResolveDialogPayloadType from "../../definitions/ResolveDialogPayloadType";
import { resolveDialogPayload } from "../../utilities/resolve";

interface DialogBatchContentSpecificProps {
    children: ResolveDialogPayloadType<React.ReactNode>;
    batchProgressProps?: DialogBatchProgressProps;
}

type DialogBatchContentProps = DialogBatchContentSpecificProps & Omit<MuiDialogContentProps, "children">;

const DialogBatchContent = ({ children, batchProgressProps, ...props }: DialogBatchContentProps) => {
    const { payload, initialized } = useDialog();

    const resolvedChildren = resolveDialogPayload<React.ReactNode>(children, payload, initialized);

    return (
        <MuiDialogContent {...props}>
            {initialized ? (
                <>
                    {resolvedChildren}
                    <DialogBatchProgress {...batchProgressProps} />
                    <DialogBatchResults />
                </>
            ) : (
                <DialogContentLoader />
            )}
        </MuiDialogContent>
    );
};

export default DialogBatchContent;
export { DialogBatchContentSpecificProps, DialogBatchContentProps };
