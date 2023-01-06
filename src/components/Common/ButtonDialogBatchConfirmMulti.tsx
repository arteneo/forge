import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchConfirmMulti, { DialogBatchConfirmMultiProps } from "../../components/Dialog/DialogBatchConfirmMulti";

interface ButtonDialogBatchConfirmMultiProps extends ButtonProps {
    dialogProps: Omit<DialogBatchConfirmMultiProps, "open" | "onClose">;
}

const ButtonDialogBatchConfirmMulti = ({ dialogProps, ...buttonProps }: ButtonDialogBatchConfirmMultiProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchConfirmMulti
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchConfirmMulti;
export { ButtonDialogBatchConfirmMultiProps };
