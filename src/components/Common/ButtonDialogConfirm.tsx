import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogConfirm, { DialogConfirmProps } from "../../components/Dialog/DialogConfirm";

type ButtonDialogConfirmProps = ExternalGenericButtonDialogProps<DialogConfirmProps>;

const ButtonDialogConfirm = (props: ButtonDialogConfirmProps) => {
    return (
        <GenericButtonDialog<DialogConfirmProps>
            {...{
                component: DialogConfirm,
                ...props,
            }}
        />
    );
};

export default ButtonDialogConfirm;
export { ButtonDialogConfirmProps };
