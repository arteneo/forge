import {
    GenericButtonDialog,
    type ExternalGenericButtonDialogProps,
} from "../../components/Common/GenericButtonDialog";
import {
    DialogBatchAlertConfirm,
    type DialogBatchAlertConfirmProps,
} from "../../components/Dialog/DialogBatchAlertConfirm";

type ButtonDialogBatchAlertConfirmProps = ExternalGenericButtonDialogProps<DialogBatchAlertConfirmProps>;

const ButtonDialogBatchAlertConfirm = (props: ButtonDialogBatchAlertConfirmProps) => {
    return (
        <GenericButtonDialog<DialogBatchAlertConfirmProps>
            {...{
                component: DialogBatchAlertConfirm,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatchAlertConfirm, type ButtonDialogBatchAlertConfirmProps };
