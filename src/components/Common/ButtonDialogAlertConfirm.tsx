import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogAlertConfirm, { DialogAlertConfirmProps } from "../../components/Dialog/DialogAlertConfirm";

interface ButtonDialogAlertConfirmProps extends ButtonProps {
    dialogProps: Omit<DialogAlertConfirmProps, "open" | "onClose">;
}

const ButtonDialogAlertConfirm = ({ dialogProps, ...buttonProps }: ButtonDialogAlertConfirmProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
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

export default ButtonDialogAlertConfirm;
export { ButtonDialogAlertConfirmProps };
