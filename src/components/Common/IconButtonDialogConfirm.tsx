import React from "react";

import { IconButton, type IconButtonProps } from "../../components/Common/IconButton";
import { DialogConfirm, type DialogConfirmProps } from "../../components/Dialog/DialogConfirm";

interface IconButtonDialogConfirmProps extends IconButtonProps {
    dialogProps: Omit<DialogConfirmProps, "open" | "onClose">;
}

const IconButtonDialogConfirm = ({ dialogProps, ...buttonProps }: IconButtonDialogConfirmProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <IconButton
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogConfirm
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export { IconButtonDialogConfirm, type IconButtonDialogConfirmProps };
