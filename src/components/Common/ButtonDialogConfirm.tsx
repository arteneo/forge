import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogConfirm, { DialogConfirmProps } from "../../components/Dialog/DialogConfirm";

interface ButtonDialogConfirmProps extends ButtonProps {
    dialogProps: Omit<DialogConfirmProps, "open" | "onClose">;
}

const ButtonDialogConfirm = ({ dialogProps, ...buttonProps }: ButtonDialogConfirmProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogConfirm {...{ open: showDialog, onClose: () => setShowDialog(false), ...dialogProps }} />
        </>
    );
};

export default ButtonDialogConfirm;
export { ButtonDialogConfirmProps };
