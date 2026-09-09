import React from "react";

import { Button, type ButtonProps } from "../../components/Common/Button";
import { DialogForm, type DialogFormProps } from "../../components/Dialog/DialogForm";

interface IconButtonDialogFormProps extends ButtonProps {
    dialogProps: Omit<DialogFormProps, "open" | "onClose">;
}

const IconButtonDialogForm = ({ dialogProps, ...buttonProps }: IconButtonDialogFormProps) => {
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

export { IconButtonDialogForm, type IconButtonDialogFormProps };
