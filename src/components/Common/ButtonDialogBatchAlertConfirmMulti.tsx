import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchAlertConfirmMulti, {
    DialogBatchAlertConfirmMultiProps,
} from "../../components/Dialog/DialogBatchAlertConfirmMulti";

interface ButtonDialogBatchAlertConfirmMultiProps extends ButtonProps {
    dialogProps: Omit<DialogBatchAlertConfirmMultiProps, "open" | "onClose">;
}

const ButtonDialogBatchAlertConfirmMulti = ({
    dialogProps,
    ...buttonProps
}: ButtonDialogBatchAlertConfirmMultiProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchAlertConfirmMulti
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchAlertConfirmMulti;
export { ButtonDialogBatchAlertConfirmMultiProps };
