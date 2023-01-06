import React from "react";
import GenericButtonDialog, { GenericButtonDialogProps } from "../..//components/Common/GenericButtonDialog";
import DialogBatchFormMultiAlertFieldset, {
    DialogBatchFormMultiAlertFieldsetProps,
} from "../../components/Dialog/DialogBatchFormMultiAlertFieldset";

type ButtonDialogBatchFormMultiAlertFieldsetProps = Omit<
    GenericButtonDialogProps<DialogBatchFormMultiAlertFieldsetProps>,
    "component"
>;

// TODO Verify whether this approach with GenericButtonDialog actually works with TS when using package normally (not through watch-local)
const ButtonDialogBatchFormMultiAlertFieldset = (props: ButtonDialogBatchFormMultiAlertFieldsetProps) => {
    return (
        <GenericButtonDialog<DialogBatchFormMultiAlertFieldsetProps>
            {...{
                component: DialogBatchFormMultiAlertFieldset,
                ...props,
            }}
        />
    );
};

export default ButtonDialogBatchFormMultiAlertFieldset;
export { ButtonDialogBatchFormMultiAlertFieldsetProps };
