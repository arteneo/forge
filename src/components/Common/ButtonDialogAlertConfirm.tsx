import {
    GenericButtonDialog,
    type ExternalGenericButtonDialogProps,
} from "../../components/Common/GenericButtonDialog";
import { DialogAlertConfirm, type DialogAlertConfirmProps } from "../../components/Dialog/DialogAlertConfirm";

type ButtonDialogAlertConfirmProps = ExternalGenericButtonDialogProps<DialogAlertConfirmProps>;

const ButtonDialogAlertConfirm = (props: ButtonDialogAlertConfirmProps) => {
    return (
        <GenericButtonDialog<DialogAlertConfirmProps>
            {...{
                component: DialogAlertConfirm,
                ...props,
            }}
        />
    );
};

export { ButtonDialogAlertConfirm, type ButtonDialogAlertConfirmProps };
