
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogBatchConfirm, type DialogBatchConfirmProps } from "../../components/Dialog/DialogBatchConfirm";

type ButtonDialogBatchConfirmProps = ExternalGenericButtonDialogProps<DialogBatchConfirmProps>;

const ButtonDialogBatchConfirm = (props: ButtonDialogBatchConfirmProps) => {
    return (
        <GenericButtonDialog<DialogBatchConfirmProps>
            {...{
                component: DialogBatchConfirm,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatchConfirm, type ButtonDialogBatchConfirmProps };
