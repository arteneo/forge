
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogFormAlertFieldset, type DialogFormAlertFieldsetProps } from "../../components/Dialog/DialogFormAlertFieldset";

type ButtonDialogFormAlertFieldsetProps = ExternalGenericButtonDialogProps<DialogFormAlertFieldsetProps>;

const ButtonDialogFormAlertFieldset = (props: ButtonDialogFormAlertFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogFormAlertFieldsetProps>
            {...{
                component: DialogFormAlertFieldset,
                ...props,
            }}
        />
    );
};

export { ButtonDialogFormAlertFieldset, type ButtonDialogFormAlertFieldsetProps };
