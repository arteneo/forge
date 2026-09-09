
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogBatchFormMulti, type DialogBatchFormMultiProps } from "../../components/Dialog/DialogBatchFormMulti";

type ButtonDialogBatchFormMultiProps = ExternalGenericButtonDialogProps<DialogBatchFormMultiProps>;

const ButtonDialogBatchFormMulti = (props: ButtonDialogBatchFormMultiProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormMultiProps>
            {...{
                component: DialogBatchFormMulti,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatchFormMulti, type ButtonDialogBatchFormMultiProps };
