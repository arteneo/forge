import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchFormMultiAlertFieldset, {
    DialogBatchFormMultiAlertFieldsetProps,
} from "../../components/Dialog/DialogBatchFormMultiAlertFieldset";

type ButtonDialogBatchFormMultiAlertFieldsetProps =
    ExternalGenericButtonDialogProps<DialogBatchFormMultiAlertFieldsetProps>;

const ButtonDialogBatchFormMultiAlertFieldset = (props: ButtonDialogBatchFormMultiAlertFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormMultiAlertFieldsetProps>
            {...{
                component: DialogBatchFormMultiAlertFieldset,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchFormMultiAlertFieldset;
export { ButtonDialogBatchFormMultiAlertFieldsetProps };
