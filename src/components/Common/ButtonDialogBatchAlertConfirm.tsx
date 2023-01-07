import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchAlertConfirm, { DialogBatchAlertConfirmProps } from "../../components/Dialog/DialogBatchAlertConfirm";

type ButtonDialogBatchAlertConfirmProps = ExternalGenericButtonDialogProps<DialogBatchAlertConfirmProps>;

const ButtonDialogBatchAlertConfirm = (props: ButtonDialogBatchAlertConfirmProps) => {
    return (
        <GenericButtonDialog<DialogBatchAlertConfirmProps>
            {...{
                component: DialogBatchAlertConfirm,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchAlertConfirm;
export { ButtonDialogBatchAlertConfirmProps };
