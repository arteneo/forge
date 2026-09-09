
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogBatchFormFieldset, type DialogBatchFormFieldsetProps } from "../../components/Dialog/DialogBatchFormFieldset";

type ButtonDialogBatchFormFieldsetProps = ExternalGenericButtonDialogProps<DialogBatchFormFieldsetProps>;

const ButtonDialogBatchFormFieldset = (props: ButtonDialogBatchFormFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormFieldsetProps>
            {...{
                component: DialogBatchFormFieldset,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatchFormFieldset, type ButtonDialogBatchFormFieldsetProps };
