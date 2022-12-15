import React from "react";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";
import Button, { ButtonProps } from "../../components/Common/Button";

interface ButtonDialogProps extends ButtonProps {
    dialogProps: Omit<DialogProps, "open" | "onClose">;
}

const ButtonDialog = ({ dialogProps, ...buttonProps }: ButtonDialogProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <Dialog {...{ open: showDialog, onClose: () => setShowDialog(false), ...dialogProps }} />
        </>
    );
};

export default ButtonDialog;
export { ButtonDialogProps };
