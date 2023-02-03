import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogFormAlertFieldset, { DialogFormAlertFieldsetProps } from "../../components/Dialog/DialogFormAlertFieldset";

interface IconButtonDialogFormAlertFieldsetProps extends ButtonProps {
    dialogProps: Omit<DialogFormAlertFieldsetProps, "open" | "onClose">;
}

const IconButtonDialogFormAlertFieldset = ({ dialogProps, ...buttonProps }: IconButtonDialogFormAlertFieldsetProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogFormAlertFieldset
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default IconButtonDialogFormAlertFieldset;
export { IconButtonDialogFormAlertFieldsetProps };
