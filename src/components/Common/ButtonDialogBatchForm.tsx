
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogBatchForm, type DialogBatchFormProps } from "../../components/Dialog/DialogBatchForm";

type ButtonDialogBatchFormProps = ExternalGenericButtonDialogProps<DialogBatchFormProps>;

const ButtonDialogBatchForm = (props: ButtonDialogBatchFormProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormProps>
            {...{
                component: DialogBatchForm,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatchForm, type ButtonDialogBatchFormProps };
