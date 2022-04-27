import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import DialogForm, { DialogFormFormProps } from "../../components/Common/DialogForm";

interface RenderDialogFormParams {
    open: boolean;
    onClose: () => void;
    formProps: DialogFormFormProps;
}

interface IconButtonDialogFormProps extends IconButtonProps {
    formProps: DialogFormFormProps;
    renderDialog?: (params: RenderDialogFormParams) => React.ReactNode;
}

const IconButtonDialogForm = ({
    formProps,
    renderDialog = (params) => <DialogForm {...params} />,
    ...iconButtonProps
}: IconButtonDialogFormProps) => {
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
                formProps,
            })}
        </>
    );
};

export default IconButtonDialogForm;
export { IconButtonDialogFormProps, RenderDialogFormParams };
