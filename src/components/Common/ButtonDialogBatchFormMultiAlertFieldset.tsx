
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogBatchFormMultiAlertFieldset, type DialogBatchFormMultiAlertFieldsetProps } from "../../components/Dialog/DialogBatchFormMultiAlertFieldset";

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

export { ButtonDialogBatchFormMultiAlertFieldset, type ButtonDialogBatchFormMultiAlertFieldsetProps };
