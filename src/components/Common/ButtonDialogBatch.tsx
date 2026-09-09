
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogBatch, type DialogBatchProps } from "../../components/Dialog/DialogBatch";

type ButtonDialogBatchProps = ExternalGenericButtonDialogProps<DialogBatchProps>;

const ButtonDialogBatch = (props: ButtonDialogBatchProps) => {
    return (
        <GenericButtonDialog<DialogBatchProps>
            {...{
                component: DialogBatch,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatch, type ButtonDialogBatchProps };
