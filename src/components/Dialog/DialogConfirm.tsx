import React from "react";
import { Check } from "@mui/icons-material";
import Optional from "../../definitions/Optional";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";
import ButtonEndpoint, { ButtonEndpointProps } from "../../components/Common/ButtonEndpoint";

interface DialogConfirmProps extends Optional<DialogProps, "title" | "children"> {
    buttonProps: ButtonEndpointProps;
}

const DialogConfirm = ({ buttonProps, ...props }: DialogConfirmProps) => {
    return (
        <Dialog
            {...{
                title: "dialogConfirm.title",
                children: <>Are you sure?</>,
                actions: (
                    <ButtonEndpoint
                        {...{
                            label: "action.confirm",
                            variant: "contained",
                            color: "primary",
                            endIcon: <Check />,
                            // TODO Onsuccess close dialog
                            // TODO show loader internally (probably move loader to the button)
                            ...buttonProps,
                        }}
                    />
                ),
                ...props,
            }}
        />
    );
};

export default DialogConfirm;
export { DialogConfirmProps };
