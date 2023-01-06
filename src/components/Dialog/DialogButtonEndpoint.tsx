import React from "react";
import { Check } from "@mui/icons-material";
import ButtonEndpoint, { ButtonEndpointProps } from "../../components/Common/ButtonEndpoint";
import { useDialog } from "../../contexts/Dialog";

const DialogButtonEndpoint = ({
    label = "action.confirm",
    color = "success",
    variant = "contained",
    endIcon = <Check />,
    ...props
}: ButtonEndpointProps) => {
    const { onClose, initialized } = useDialog();

    return (
        <ButtonEndpoint
            {...{
                label,
                color,
                variant,
                endIcon,
                ...props,
                disabled: initialized ? props.disabled : true,
                onSuccess: (defaultOnSuccess, response, setLoading) => {
                    const internalDefaultOnSuccess = () => {
                        defaultOnSuccess();
                        onClose();
                    };

                    if (typeof props.onSuccess !== "undefined") {
                        props.onSuccess(internalDefaultOnSuccess, response, setLoading);
                        return;
                    }

                    internalDefaultOnSuccess();
                },
                onCatch: (defaultOnCatch, error, setLoading) => {
                    const internalDefaultOnCatch = () => {
                        defaultOnCatch();
                        onClose();
                    };

                    if (typeof props.onCatch !== "undefined") {
                        props.onCatch(internalDefaultOnCatch, error, setLoading);
                        return;
                    }

                    internalDefaultOnCatch();
                },
            }}
        />
    );
};

export default DialogButtonEndpoint;
export { ButtonEndpointProps as DialogButtonEndpointProps };
