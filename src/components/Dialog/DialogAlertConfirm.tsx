import React from "react";
import { Check } from "@mui/icons-material";
import Optional from "../../definitions/Optional";
import DialogAlert, { DialogAlertProps } from "../../components/Dialog/DialogAlert";
import DialogButtonEndpoint, { DialogButtonEndpointProps } from "../../components/Dialog/DialogButtonEndpoint";

interface DialogAlertConfirmProps extends Optional<DialogAlertProps, "title"> {
    confirmProps: DialogButtonEndpointProps;
}

const DialogAlertConfirm = ({ confirmProps, ...props }: DialogAlertConfirmProps) => {
    return (
        <DialogAlert
            {...{
                title: "dialogAlertConfirm.title",
                actions: (
                    <DialogButtonEndpoint
                        {...{
                            label: "dialogAlertConfirm.confirm",
                            color: "success",
                            endIcon: <Check />,
                            ...confirmProps,
                        }}
                    />
                ),
                ...props,
            }}
        />
    );
};

export default DialogAlertConfirm;
export { DialogAlertConfirmProps };
