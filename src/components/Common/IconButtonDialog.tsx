import React from "react";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";

interface IconButtonDialogProps extends IconButtonProps {
    dialogProps: Omit<DialogProps, "open" | "onClose">;
}

const IconButtonDialog = ({ dialogProps, ...iconButtonProps }: IconButtonDialogProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <IconButton
                {...{
                    onClick: () => setShowDialog(true),
                    ...iconButtonProps,
                }}
            />

            <Dialog {...{ open: showDialog, onClose: () => setShowDialog(false), ...dialogProps }} />
        </>
    );
};

export default IconButtonDialog;
export { IconButtonDialogProps };
