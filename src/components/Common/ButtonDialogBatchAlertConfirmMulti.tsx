import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchAlertConfirmMulti, {
    DialogBatchAlertConfirmMultiProps,
} from "../../components/Dialog/DialogBatchAlertConfirmMulti";

type ButtonDialogBatchAlertConfirmMultiProps = ExternalGenericButtonDialogProps<DialogBatchAlertConfirmMultiProps>;

const ButtonDialogBatchAlertConfirmMulti = (props: ButtonDialogBatchAlertConfirmMultiProps) => {
    return (
        <GenericButtonDialog<DialogBatchAlertConfirmMultiProps>
            {...{
                component: DialogBatchAlertConfirmMulti,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchAlertConfirmMulti;
export { ButtonDialogBatchAlertConfirmMultiProps };
