import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogForm, { DialogFormProps } from "../../components/Dialog/DialogForm";

interface ButtonDialogFormProps extends ButtonProps {
    dialogProps: Omit<DialogFormProps, "open" | "onClose">;
}

const ButtonDialogForm = ({ dialogProps, ...buttonProps }: ButtonDialogFormProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogForm
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogForm;
export { ButtonDialogFormProps };
