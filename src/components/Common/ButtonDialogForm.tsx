import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogForm, { DialogFormProps } from "../../components/Dialog/DialogForm";

type ButtonDialogFormProps = ExternalGenericButtonDialogProps<DialogFormProps>;

const ButtonDialogForm = (props: ButtonDialogFormProps) => {
    return (
        <GenericButtonDialog<DialogFormProps>
            {...{
                component: DialogForm,
                ...props,
            }}
        />
    );
};

export default ButtonDialogForm;
export { ButtonDialogFormProps };
