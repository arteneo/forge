import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogAlert, { DialogAlertProps } from "../../components/Dialog/DialogAlert";

interface ButtonDialogAlertProps extends ButtonProps {
    dialogProps: Omit<DialogAlertProps, "open" | "onClose">;
}

const ButtonDialogAlert = ({ dialogProps, ...buttonProps }: ButtonDialogAlertProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
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

export default ButtonDialogAlert;
export { ButtonDialogAlertProps };
