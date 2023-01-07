import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchFormFieldset, { DialogBatchFormFieldsetProps } from "../../components/Dialog/DialogBatchFormFieldset";

type ButtonDialogBatchFormFieldsetProps = ExternalGenericButtonDialogProps<DialogBatchFormFieldsetProps>;

const ButtonDialogBatchFormFieldset = (props: ButtonDialogBatchFormFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormFieldsetProps>
            {...{
                component: DialogBatchFormFieldset,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchFormFieldset;
export { ButtonDialogBatchFormFieldsetProps };
