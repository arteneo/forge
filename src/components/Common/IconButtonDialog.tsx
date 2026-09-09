import React from "react";

import { IconButton, type IconButtonProps } from "../../components/Common/IconButton";
import { Dialog, type DialogProps } from "../../components/Dialog/Dialog";

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

export { IconButtonDialog, type IconButtonDialogProps };
