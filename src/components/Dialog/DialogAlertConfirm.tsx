import React from "react";

import DialogAlert, { DialogAlertProps } from "../../components/Dialog/DialogAlert";
import DialogButtonEndpoint, { DialogButtonEndpointProps } from "../../components/Dialog/DialogButtonEndpoint";
import Optional from "../../definitions/Optional";

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

export default DialogAlertConfirm;
export { DialogAlertConfirmProps };
