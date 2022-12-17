import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import DialogConfirm, { DialogConfirmProps } from "../../components/Dialog/DialogConfirm";

interface IconButtonDialogConfirmProps extends IconButtonProps {
    dialogProps: Omit<DialogConfirmProps, "open" | "onClose">;
}

const IconButtonDialogConfirm = ({ dialogProps, ...buttonProps }: IconButtonDialogConfirmProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <IconButton
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogConfirm
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default IconButtonDialogConfirm;
export { IconButtonDialogConfirmProps };
