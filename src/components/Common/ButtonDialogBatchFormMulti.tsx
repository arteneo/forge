import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchFormMulti, { DialogBatchFormMultiProps } from "../../components/Dialog/DialogBatchFormMulti";

interface ButtonDialogBatchFormMultiProps extends ButtonProps {
    dialogProps: Omit<DialogBatchFormMultiProps, "open" | "onClose">;
}

const ButtonDialogBatchFormMulti = ({ dialogProps, ...buttonProps }: ButtonDialogBatchFormMultiProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchFormMulti
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchFormMulti;
export { ButtonDialogBatchFormMultiProps };
