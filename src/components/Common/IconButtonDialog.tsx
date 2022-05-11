import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";

interface IconButtonDialogRenderDialogParams {
    open: boolean;
    onClose: () => void;
}

interface IconButtonDialogProps extends IconButtonProps {
    renderDialog: (params: IconButtonDialogRenderDialogParams) => React.ReactNode;
}

const IconButtonDialog = ({ renderDialog, ...iconButtonProps }: IconButtonDialogProps) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <IconButton
                {...{
                    onClick: () => setShowDialog(true),
                    ...iconButtonProps,
                }}
            />

            {renderDialog({
                open: showDialog,
                onClose: () => setShowDialog(false),
            })}
        </>
    );
};

export default IconButtonDialog;
export { IconButtonDialogProps, IconButtonDialogRenderDialogParams };
