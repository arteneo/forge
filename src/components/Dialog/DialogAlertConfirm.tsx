import { DialogAlert, type DialogAlertProps } from "../../components/Dialog/DialogAlert";
import { DialogButtonEndpoint, type DialogButtonEndpointProps } from "../../components/Dialog/DialogButtonEndpoint";
import { Optional } from "../../definitions/Optional";

interface DialogAlertConfirmProps extends Optional<DialogAlertProps, "title"> {
    confirmProps: DialogButtonEndpointProps;
}

const DialogAlertConfirm = ({ confirmProps, ...props }: DialogAlertConfirmProps) => {
    return (
        <DialogAlert
            {...{
                title: "dialogConfirm.title",
                actions: <DialogButtonEndpoint {...confirmProps} />,
                ...props,
            }}
        />
    );
};

export { DialogAlertConfirm, type DialogAlertConfirmProps };
