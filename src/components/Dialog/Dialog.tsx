import React from "react";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import DialogTitle, { DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import DialogContent, { DialogContentSpecificProps } from "../../components/Dialog/DialogContent";
import DialogActions, { DialogActionsSpecificProps } from "../../components/Dialog/DialogActions";

type DialogProps = DialogTitleSpecificProps &
    DialogContentSpecificProps &
    DialogActionsSpecificProps &
    Omit<DialogProviderProps, "children">;

const Dialog = ({ children, title, titleVariables, onClose, actions, ...props }: DialogProps) => {
    return (
        <DialogProvider {...{ onClose, ...props }}>
            <DialogTitle {...{ title, titleVariables }} />
            <DialogContent {...{ children }} />
            <DialogActions {...{ actions }} />
        </DialogProvider>
    );
};

export default Dialog;
export { DialogProps };
