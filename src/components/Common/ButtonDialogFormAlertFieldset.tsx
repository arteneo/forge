import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogFormAlertFieldset, { DialogFormAlertFieldsetProps } from "../../components/Dialog/DialogFormAlertFieldset";

type ButtonDialogFormAlertFieldsetProps = ExternalGenericButtonDialogProps<DialogFormAlertFieldsetProps>;

const ButtonDialogFormAlertFieldset = (props: ButtonDialogFormAlertFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogFormAlertFieldsetProps>
            {...{
                component: DialogFormAlertFieldset,
                ...props,
            }}
        />
    );
};

export default ButtonDialogFormAlertFieldset;
export { ButtonDialogFormAlertFieldsetProps };
