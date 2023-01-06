import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchFormMultiAlertFieldset, {
    DialogBatchFormMultiAlertFieldsetProps,
} from "../../components/Dialog/DialogBatchFormMultiAlertFieldset";

interface ButtonDialogBatchFormMultiAlertFieldsetProps extends ButtonProps {
    dialogProps: Omit<DialogBatchFormMultiAlertFieldsetProps, "open" | "onClose">;
}

const ButtonDialogBatchFormMultiAlertFieldset = ({
    dialogProps,
    ...buttonProps
}: ButtonDialogBatchFormMultiAlertFieldsetProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchFormMultiAlertFieldset
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchFormMultiAlertFieldset;
export { ButtonDialogBatchFormMultiAlertFieldsetProps };
