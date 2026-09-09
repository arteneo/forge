
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogAlert, type DialogAlertProps } from "../../components/Dialog/DialogAlert";

type ButtonDialogAlertProps = ExternalGenericButtonDialogProps<DialogAlertProps>;

const ButtonDialogAlert = (props: ButtonDialogAlertProps) => {
    return (
        <GenericButtonDialog<DialogAlertProps>
            {...{
                component: DialogAlert,
                ...props,
            }}
        />
    );
};

export { ButtonDialogAlert, type ButtonDialogAlertProps };
