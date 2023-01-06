import React from "react";
import Optional from "../../definitions/Optional";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";
import DialogButtonEndpoint, { DialogButtonEndpointProps } from "../../components/Dialog/DialogButtonEndpoint";

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

export default DialogConfirm;
export { DialogConfirmProps };
