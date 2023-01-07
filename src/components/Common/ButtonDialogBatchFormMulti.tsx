import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchFormMulti, { DialogBatchFormMultiProps } from "../../components/Dialog/DialogBatchFormMulti";

type ButtonDialogBatchFormMultiProps = ExternalGenericButtonDialogProps<DialogBatchFormMultiProps>;

const ButtonDialogBatchFormMulti = (props: ButtonDialogBatchFormMultiProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormMultiProps>
            {...{
                component: DialogBatchFormMulti,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchFormMulti;
export { ButtonDialogBatchFormMultiProps };
