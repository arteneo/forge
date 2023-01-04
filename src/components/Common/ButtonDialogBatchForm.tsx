import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchForm, { DialogBatchFormProps } from "../../components/Dialog/DialogBatchForm";

interface ButtonDialogBatchFormProps extends ButtonProps {
    dialogProps: Omit<DialogBatchFormProps, "open" | "onClose">;
}

const ButtonDialogBatchForm = ({ dialogProps, ...buttonProps }: ButtonDialogBatchFormProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchForm
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchForm;
export { ButtonDialogBatchFormProps };
