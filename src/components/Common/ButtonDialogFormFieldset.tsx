import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogFormFieldset, { DialogFormFieldsetProps } from "../../components/Dialog/DialogFormFieldset";

interface ButtonDialogFormFieldsetProps extends ButtonProps {
    dialogProps: Omit<DialogFormFieldsetProps, "open" | "onClose">;
}

const ButtonDialogFormFieldset = ({ dialogProps, ...buttonProps }: ButtonDialogFormFieldsetProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogFormFieldset
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogFormFieldset;
export { ButtonDialogFormFieldsetProps };
