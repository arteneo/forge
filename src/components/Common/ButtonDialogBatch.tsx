import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatch, { DialogBatchProps } from "../../components/Dialog/DialogBatch";

type ButtonDialogBatchProps = ExternalGenericButtonDialogProps<DialogBatchProps>;

const ButtonDialogBatch = (props: ButtonDialogBatchProps) => {
    return (
        <GenericButtonDialog<DialogBatchProps>
            {...{
                component: DialogBatch,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatch;
export { ButtonDialogBatchProps };
