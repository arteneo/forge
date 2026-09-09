
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogBatchAlert, type DialogBatchAlertProps } from "../../components/Dialog/DialogBatchAlert";

type ButtonDialogBatchAlertProps = ExternalGenericButtonDialogProps<DialogBatchAlertProps>;

const ButtonDialogBatchAlert = (props: ButtonDialogBatchAlertProps) => {
    return (
        <GenericButtonDialog<DialogBatchAlertProps>
            {...{
                component: DialogBatchAlert,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatchAlert, type ButtonDialogBatchAlertProps };
