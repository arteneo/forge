import React from "react";

import { IconButton, type IconButtonProps } from "../../components/Common/IconButton";
import { DialogAlert, type DialogAlertProps } from "../../components/Dialog/DialogAlert";

interface IconButtonDialogAlertProps extends IconButtonProps {
    dialogProps: Omit<DialogAlertProps, "open" | "onClose">;
}

const IconButtonDialogAlert = ({ dialogProps, ...buttonProps }: IconButtonDialogAlertProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <IconButton
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogAlert
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export { IconButtonDialogAlert, type IconButtonDialogAlertProps };
