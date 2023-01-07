import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogAlertConfirm, { DialogAlertConfirmProps } from "../../components/Dialog/DialogAlertConfirm";

type ButtonDialogAlertConfirmProps = ExternalGenericButtonDialogProps<DialogAlertConfirmProps>;

const ButtonDialogAlertConfirm = (props: ButtonDialogAlertConfirmProps) => {
    return (
        <GenericButtonDialog<DialogAlertConfirmProps>
            {...{
                component: DialogAlertConfirm,
                ...props,
            }}
        />
    );
};

export default ButtonDialogAlertConfirm;
export { ButtonDialogAlertConfirmProps };
