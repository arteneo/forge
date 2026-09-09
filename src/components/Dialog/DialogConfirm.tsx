import { Dialog, type DialogProps } from "../../components/Dialog/Dialog";
import { DialogButtonEndpoint, type DialogButtonEndpointProps } from "../../components/Dialog/DialogButtonEndpoint";
import { Optional } from "../../definitions/Optional";

interface DialogConfirmProps extends Optional<DialogProps, "title"> {
    confirmProps: DialogButtonEndpointProps;
}

const DialogConfirm = ({ confirmProps, ...props }: DialogConfirmProps) => {
    return (
        <Dialog
            {...{
                title: "dialogConfirm.title",
                actions: <DialogButtonEndpoint {...confirmProps} />,
                ...props,
            }}
        />
    );
};

export { DialogConfirm, type DialogConfirmProps };
