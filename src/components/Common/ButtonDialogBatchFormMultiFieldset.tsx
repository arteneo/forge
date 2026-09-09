import {
    GenericButtonDialog,
    type ExternalGenericButtonDialogProps,
} from "../../components/Common/GenericButtonDialog";
import {
    DialogBatchFormMultiFieldset,
    type DialogBatchFormMultiFieldsetProps,
} from "../../components/Dialog/DialogBatchFormMultiFieldset";

type ButtonDialogBatchFormMultiFieldsetProps = ExternalGenericButtonDialogProps<DialogBatchFormMultiFieldsetProps>;

const ButtonDialogBatchFormMultiFieldset = (props: ButtonDialogBatchFormMultiFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormMultiFieldsetProps>
            {...{
                component: DialogBatchFormMultiFieldset,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatchFormMultiFieldset, type ButtonDialogBatchFormMultiFieldsetProps };
