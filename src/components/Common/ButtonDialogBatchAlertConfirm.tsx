import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchAlertConfirm, { DialogBatchAlertConfirmProps } from "../../components/Dialog/DialogBatchAlertConfirm";

interface ButtonDialogBatchAlertConfirmProps extends ButtonProps {
    dialogProps: Omit<DialogBatchAlertConfirmProps, "open" | "onClose">;
}

const ButtonDialogBatchAlertConfirm = ({ dialogProps, ...buttonProps }: ButtonDialogBatchAlertConfirmProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchAlertConfirm
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchAlertConfirm;
export { ButtonDialogBatchAlertConfirmProps };
