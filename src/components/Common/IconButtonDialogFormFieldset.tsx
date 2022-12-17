import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogFormFieldset, { DialogFormFieldsetProps } from "../../components/Dialog/DialogFormFieldset";

interface IconButtonDialogFormFieldsetProps extends ButtonProps {
    dialogProps: Omit<DialogFormFieldsetProps, "open" | "onClose">;
}

const IconButtonDialogFormFieldset = ({ dialogProps, ...buttonProps }: IconButtonDialogFormFieldsetProps) => {
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

export default IconButtonDialogFormFieldset;
export { IconButtonDialogFormFieldsetProps };
