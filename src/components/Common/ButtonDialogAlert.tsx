import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogAlert, { DialogAlertProps } from "../../components/Dialog/DialogAlert";

type ButtonDialogAlertProps = ExternalGenericButtonDialogProps<DialogAlertProps>;

const ButtonDialogAlert = (props: ButtonDialogAlertProps) => {
    return (
        <GenericButtonDialog<DialogAlertProps>
            {...{
                component: DialogAlert,
                ...props,
            }}
        />
    );
};

export default ButtonDialogAlert;
export { ButtonDialogAlertProps };
