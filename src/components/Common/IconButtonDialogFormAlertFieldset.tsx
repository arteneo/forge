import React from "react";

import { Button, type ButtonProps } from "../../components/Common/Button";
import {
    DialogFormAlertFieldset,
    type DialogFormAlertFieldsetProps,
} from "../../components/Dialog/DialogFormAlertFieldset";

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

export { IconButtonDialogFormAlertFieldset, type IconButtonDialogFormAlertFieldsetProps };
