import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";

interface ButtonDialogRenderDialogParams {
    open: boolean;
    onClose: () => void;
}

interface ButtonDialogProps extends ButtonProps {
    renderDialog: (params: ButtonDialogRenderDialogParams) => React.ReactNode;
}

const ButtonDialog = ({ renderDialog, ...buttonProps }: ButtonDialogProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            {renderDialog({
                open: showDialog,
                onClose: () => setShowDialog(false),
            })}
        </>
    );
};

export default ButtonDialog;
export { ButtonDialogProps, ButtonDialogRenderDialogParams };
