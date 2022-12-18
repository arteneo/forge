import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchConfirm, { DialogBatchConfirmProps } from "../../components/Dialog/DialogBatchConfirm";

interface ButtonDialogBatchConfirmProps extends ButtonProps {
    dialogProps: Omit<DialogBatchConfirmProps, "open" | "onClose">;
}

const ButtonDialogBatchConfirm = ({ dialogProps, ...buttonProps }: ButtonDialogBatchConfirmProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchConfirm
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchConfirm;
export { ButtonDialogBatchConfirmProps };
