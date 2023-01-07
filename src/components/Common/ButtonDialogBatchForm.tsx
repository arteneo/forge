import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchForm, { DialogBatchFormProps } from "../../components/Dialog/DialogBatchForm";

type ButtonDialogBatchFormProps = ExternalGenericButtonDialogProps<DialogBatchFormProps>;

const ButtonDialogBatchForm = (props: ButtonDialogBatchFormProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormProps>
            {...{
                component: DialogBatchForm,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchForm;
export { ButtonDialogBatchFormProps };
