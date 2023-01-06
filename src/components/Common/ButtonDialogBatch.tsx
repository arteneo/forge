import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatch, { DialogBatchProps } from "../../components/Dialog/DialogBatch";

interface ButtonDialogBatchProps extends ButtonProps {
    dialogProps: Omit<DialogBatchProps, "open" | "onClose">;
}

const ButtonDialogBatch = ({ dialogProps, ...buttonProps }: ButtonDialogBatchProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatch
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatch;
export { ButtonDialogBatchProps };
