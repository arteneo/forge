import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogFormMulti, { DialogFormMultiProps } from "../../components/Dialog/DialogFormMulti";

interface ButtonDialogFormMultiProps extends ButtonProps {
    dialogProps: Omit<DialogFormMultiProps, "open" | "onClose">;
}

const ButtonDialogFormMulti = ({ dialogProps, ...buttonProps }: ButtonDialogFormMultiProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogFormMulti
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogFormMulti;
export { ButtonDialogFormMultiProps };
