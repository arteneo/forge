import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";

type ButtonDialogProps = ExternalGenericButtonDialogProps<DialogProps>;

const ButtonDialog = (props: ButtonDialogProps) => {
    return (
        <GenericButtonDialog<DialogProps>
            {...{
                component: Dialog,
                ...props,
            }}
        />
    );
};

export default ButtonDialog;
export { ButtonDialogProps };
