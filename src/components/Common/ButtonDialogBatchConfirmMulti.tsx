import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchConfirmMulti, { DialogBatchConfirmMultiProps } from "../../components/Dialog/DialogBatchConfirmMulti";

type ButtonDialogBatchConfirmMultiProps = ExternalGenericButtonDialogProps<DialogBatchConfirmMultiProps>;

const ButtonDialogBatchConfirmMulti = (props: ButtonDialogBatchConfirmMultiProps) => {
    return (
        <GenericButtonDialog<DialogBatchConfirmMultiProps>
            {...{
                component: DialogBatchConfirmMulti,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchConfirmMulti;
export { ButtonDialogBatchConfirmMultiProps };
