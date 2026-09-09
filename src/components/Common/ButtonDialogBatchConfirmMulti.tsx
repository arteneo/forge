
import { GenericButtonDialog, type ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import { DialogBatchConfirmMulti, type DialogBatchConfirmMultiProps } from "../../components/Dialog/DialogBatchConfirmMulti";

type ButtonDialogBatchConfirmMultiProps = ExternalGenericButtonDialogProps<DialogBatchConfirmMultiProps>;

const ButtonDialogBatchConfirmMulti = (props: ButtonDialogBatchConfirmMultiProps) => {
    return (
        <GenericButtonDialog<DialogBatchConfirmMultiProps>
            {...{
                component: DialogBatchConfirmMulti,
                ...props,
            }}
        />
    );
};

export { ButtonDialogBatchConfirmMulti, type ButtonDialogBatchConfirmMultiProps };
