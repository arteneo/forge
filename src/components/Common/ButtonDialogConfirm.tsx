
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogConfirm, type DialogConfirmProps } from "../../components/Dialog/DialogConfirm";

type ButtonDialogConfirmProps = ExternalGenericButtonDialogProps<DialogConfirmProps>;

const ButtonDialogConfirm = (props: ButtonDialogConfirmProps) => {
    return (
        <GenericButtonDialog<DialogConfirmProps>
            {...{
                component: DialogConfirm,
                ...props,
            }}
        />
    );
};

export { ButtonDialogConfirm, type ButtonDialogConfirmProps };
