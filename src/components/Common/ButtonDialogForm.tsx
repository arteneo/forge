import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import DialogForm, { DialogFormFormProps } from "../../components/Common/DialogForm";

interface RenderDialogFormParams {
    open: boolean;
    onClose: () => void;
    formProps: DialogFormFormProps;
}

interface ButtonDialogFormProps extends ButtonProps {
    formProps: DialogFormFormProps;
    renderDialog?: (params: RenderDialogFormParams) => React.ReactNode;
}

const ButtonDialogForm = ({
    formProps,
    renderDialog = (params) => <DialogForm {...{ ...params }} />,
    ...buttonProps
}: ButtonDialogFormProps) => {
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
                formProps,
            })}
        </>
    );
};

export default ButtonDialogForm;
export { ButtonDialogFormProps, RenderDialogFormParams };
