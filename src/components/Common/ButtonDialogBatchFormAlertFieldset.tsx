import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchFormAlertFieldset, {
    DialogBatchFormAlertFieldsetProps,
} from "../../components/Dialog/DialogBatchFormAlertFieldset";

type ButtonDialogBatchFormAlertFieldsetProps = ExternalGenericButtonDialogProps<DialogBatchFormAlertFieldsetProps>;

const ButtonDialogBatchFormAlertFieldset = (props: ButtonDialogBatchFormAlertFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormAlertFieldsetProps>
            {...{
                component: DialogBatchFormAlertFieldset,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchFormAlertFieldset;
export { ButtonDialogBatchFormAlertFieldsetProps };
