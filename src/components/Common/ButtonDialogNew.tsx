import React from "react";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";
import Button, { ButtonProps } from "../../components/Common/Button";

interface ButtonDialogNewProps extends ButtonProps {
    dialogProps: Omit<DialogProps, "open" | "onClose">;
}

const ButtonDialogNew = ({ dialogProps, ...buttonProps }: ButtonDialogNewProps) => {
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

export default ButtonDialogNew;
export { ButtonDialogNewProps };
