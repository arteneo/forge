import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogBatchFormMultiFieldset, {
    DialogBatchFormMultiFieldsetProps,
} from "../../components/Dialog/DialogBatchFormMultiFieldset";

interface ButtonDialogBatchFormMultiFieldsetProps extends ButtonProps {
    dialogProps: Omit<DialogBatchFormMultiFieldsetProps, "open" | "onClose">;
}

const ButtonDialogBatchFormMultiFieldset = ({
    dialogProps,
    ...buttonProps
}: ButtonDialogBatchFormMultiFieldsetProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <DialogBatchFormMultiFieldset
                {...{
                    open: showDialog,
                    onClose: () => setShowDialog(false),
                    ...dialogProps,
                }}
            />
        </>
    );
};

export default ButtonDialogBatchFormMultiFieldset;
export { ButtonDialogBatchFormMultiFieldsetProps };
