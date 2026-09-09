import { DialogContent as MuiDialogContent, DialogContentProps as MuiDialogContentProps } from "@mui/material";
import React from "react";

import { DialogContentLoader } from "../../components/Dialog/DialogContentLoader";
import { useDialog } from "../../contexts/Dialog";
import { ResolveDialogPayloadType } from "../../definitions/ResolveDialogPayloadType";
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

export { DialogContent, type DialogContentSpecificProps, type DialogContentProps };
