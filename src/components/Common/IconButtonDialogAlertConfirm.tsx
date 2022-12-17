import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import DialogAlertConfirm, { DialogAlertConfirmProps } from "../../components/Dialog/DialogAlertConfirm";

interface IconButtonDialogAlertConfirmProps extends IconButtonProps {
    dialogProps: Omit<DialogAlertConfirmProps, "open" | "onClose">;
}

const IconButtonDialogAlertConfirm = ({ dialogProps, ...buttonProps }: IconButtonDialogAlertConfirmProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <IconButton
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogAlertConfirm
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default IconButtonDialogAlertConfirm;
export { IconButtonDialogAlertConfirmProps };
