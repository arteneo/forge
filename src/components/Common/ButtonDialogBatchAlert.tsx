import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchAlert, { DialogBatchAlertProps } from "../../components/Dialog/DialogBatchAlert";

type ButtonDialogBatchAlertProps = ExternalGenericButtonDialogProps<DialogBatchAlertProps>;

const ButtonDialogBatchAlert = (props: ButtonDialogBatchAlertProps) => {
    return (
        <GenericButtonDialog<DialogBatchAlertProps>
            {...{
                component: DialogBatchAlert,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchAlert;
export { ButtonDialogBatchAlertProps };
