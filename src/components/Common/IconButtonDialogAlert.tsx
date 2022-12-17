import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import DialogAlert, { DialogAlertProps } from "../../components/Dialog/DialogAlert";

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

export default IconButtonDialogAlert;
export { IconButtonDialogAlertProps };
