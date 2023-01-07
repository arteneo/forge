import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../components/Common/GenericButtonDialog";
import DialogBatchFormMultiFieldset, {
    DialogBatchFormMultiFieldsetProps,
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

export default ButtonDialogBatchFormMultiFieldset;
export { ButtonDialogBatchFormMultiFieldsetProps };
