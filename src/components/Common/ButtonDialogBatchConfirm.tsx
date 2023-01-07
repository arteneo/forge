import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchConfirm, { DialogBatchConfirmProps } from "../../components/Dialog/DialogBatchConfirm";

type ButtonDialogBatchConfirmProps = ExternalGenericButtonDialogProps<DialogBatchConfirmProps>;

const ButtonDialogBatchConfirm = (props: ButtonDialogBatchConfirmProps) => {
    return (
        <GenericButtonDialog<DialogBatchConfirmProps>
            {...{
                component: DialogBatchConfirm,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchConfirm;
export { ButtonDialogBatchConfirmProps };
