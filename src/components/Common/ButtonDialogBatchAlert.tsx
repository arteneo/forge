import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchAlert, { DialogBatchAlertProps } from "../../components/Dialog/DialogBatchAlert";

interface ButtonDialogBatchAlertProps extends ButtonProps {
    dialogProps: Omit<DialogBatchAlertProps, "open" | "onClose">;
}

const ButtonDialogBatchAlert = ({ dialogProps, ...buttonProps }: ButtonDialogBatchAlertProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchAlert
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchAlert;
export { ButtonDialogBatchAlertProps };
