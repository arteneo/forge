import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogFormFieldset, { DialogFormFieldsetProps } from "../../components/Dialog/DialogFormFieldset";

type ButtonDialogFormFieldsetProps = ExternalGenericButtonDialogProps<DialogFormFieldsetProps>;

const ButtonDialogFormFieldset = (props: ButtonDialogFormFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogFormFieldsetProps>
            {...{
                component: DialogFormFieldset,
                ...props,
            }}
        />
    );
};

export default ButtonDialogFormFieldset;
export { ButtonDialogFormFieldsetProps };
