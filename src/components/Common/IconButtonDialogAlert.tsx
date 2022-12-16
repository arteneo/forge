import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import DialogAlertConfirm, { DialogAlertConfirmProps } from "../../components/Dialog/DialogAlertConfirm";

interface IconButtonDialogAlertProps extends IconButtonProps {
    dialogProps: Omit<DialogAlertConfirmProps, "open" | "onClose">;
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

            <DialogAlertConfirm
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
