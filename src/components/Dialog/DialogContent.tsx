import React from "react";
import { DialogContent as MuiDialogContent, DialogContentProps as MuiDialogContentProps } from "@mui/material";
import { useDialog } from "../../contexts/Dialog";
import DialogContentLoader from "../../components/Dialog/DialogContentLoader";
import ResolveDialogPayloadType from "../../definitions/ResolveDialogPayloadType";
import { resolveDialogPayload } from "../../utilities/resolve";

interface DialogContentSpecificProps {
    children: ResolveDialogPayloadType<React.ReactNode>;
}

type DialogContentProps = DialogContentSpecificProps & Omit<MuiDialogContentProps, "children">;

const DialogContent = ({ children, ...props }: DialogContentProps) => {
    const { payload, initialized } = useDialog();

    const resolvedChildren = resolveDialogPayload<React.ReactNode>(children, payload, initialized);

    return <MuiDialogContent {...props}>{initialized ? resolvedChildren : <DialogContentLoader />}</MuiDialogContent>;
};

export default DialogContent;
export { DialogContentSpecificProps, DialogContentProps };
