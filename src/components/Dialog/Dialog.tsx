import React from "react";

import DialogActions, { DialogActionsSpecificProps } from "../../components/Dialog/DialogActions";
import DialogContent, { DialogContentSpecificProps } from "../../components/Dialog/DialogContent";
import DialogTitle, { DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";

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
