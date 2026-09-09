
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogForm, type DialogFormProps } from "../../components/Dialog/DialogForm";

type ButtonDialogFormProps = ExternalGenericButtonDialogProps<DialogFormProps>;

const ButtonDialogForm = (props: ButtonDialogFormProps) => {
    return (
        <GenericButtonDialog<DialogFormProps>
            {...{
                component: DialogForm,
                ...props,
            }}
        />
    );
};

export { ButtonDialogForm, type ButtonDialogFormProps };
