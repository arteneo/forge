import {
    GenericButtonDialog,
    type ExternalGenericButtonDialogProps,
} from "../../components/Common/GenericButtonDialog";
import { DialogFormFieldset, type DialogFormFieldsetProps } from "../../components/Dialog/DialogFormFieldset";

type ButtonDialogFormFieldsetProps = ExternalGenericButtonDialogProps<DialogFormFieldsetProps>;

const ButtonDialogFormFieldset = (props: ButtonDialogFormFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogFormFieldsetProps>
            {...{
                component: DialogFormFieldset,
                ...props,
            }}
        />
    );
};

export { ButtonDialogFormFieldset, type ButtonDialogFormFieldsetProps };
