
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogBatchFormAlertFieldset, type DialogBatchFormAlertFieldsetProps } from "../../components/Dialog/DialogBatchFormAlertFieldset";

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

export { ButtonDialogBatchFormAlertFieldset, type ButtonDialogBatchFormAlertFieldsetProps };
