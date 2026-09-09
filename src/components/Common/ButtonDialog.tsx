import {
    GenericButtonDialog,
    type ExternalGenericButtonDialogProps,
} from "../../components/Common/GenericButtonDialog";
import { Dialog, type DialogProps } from "../../components/Dialog/Dialog";

type ButtonDialogProps = ExternalGenericButtonDialogProps<DialogProps>;

const ButtonDialog = (props: ButtonDialogProps) => {
    return (
        <GenericButtonDialog<DialogProps>
            {...{
                component: Dialog,
                ...props,
            }}
        />
    );
};

export { ButtonDialog, type ButtonDialogProps };
