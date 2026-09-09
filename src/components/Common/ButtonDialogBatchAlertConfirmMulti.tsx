import {
    GenericButtonDialog,
    type ExternalGenericButtonDialogProps,
} from "../../components/Common/GenericButtonDialog";
import {
    DialogBatchAlertConfirmMulti,
    type DialogBatchAlertConfirmMultiProps,
} from "../../components/Dialog/DialogBatchAlertConfirmMulti";

type ButtonDialogBatchAlertConfirmMultiProps = ExternalGenericButtonDialogProps<DialogBatchAlertConfirmMultiProps>;

const ButtonDialogBatchAlertConfirmMulti = (props: ButtonDialogBatchAlertConfirmMultiProps) => {
    return (
        <GenericButtonDialog<DialogBatchAlertConfirmMultiProps>
            {...{
                component: DialogBatchAlertConfirmMulti,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatchAlertConfirmMulti, type ButtonDialogBatchAlertConfirmMultiProps };
