import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchFormFieldset, { DialogBatchFormFieldsetProps } from "../../components/Dialog/DialogBatchFormFieldset";

interface ButtonDialogBatchFormFieldsetProps extends ButtonProps {
    dialogProps: Omit<DialogBatchFormFieldsetProps, "open" | "onClose">;
}

const ButtonDialogBatchFormFieldset = ({ dialogProps, ...buttonProps }: ButtonDialogBatchFormFieldsetProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchFormFieldset
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchFormFieldset;
export { ButtonDialogBatchFormFieldsetProps };
