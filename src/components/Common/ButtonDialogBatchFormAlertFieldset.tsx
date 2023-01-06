import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchFormAlertFieldset, {
    DialogBatchFormAlertFieldsetProps,
} from "../../components/Dialog/DialogBatchFormAlertFieldset";

interface ButtonDialogBatchFormAlertFieldsetProps extends ButtonProps {
    dialogProps: Omit<DialogBatchFormAlertFieldsetProps, "open" | "onClose">;
}

const ButtonDialogBatchFormAlertFieldset = ({
    dialogProps,
    ...buttonProps
}: ButtonDialogBatchFormAlertFieldsetProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchFormAlertFieldset
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchFormAlertFieldset;
export { ButtonDialogBatchFormAlertFieldsetProps };
