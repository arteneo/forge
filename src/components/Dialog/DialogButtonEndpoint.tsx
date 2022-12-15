import React from "react";
import ButtonEndpoint, { ButtonEndpointProps } from "../../components/Common/ButtonEndpoint";
import { useDialog } from "../../contexts/Dialog";

const DialogButtonEndpoint = (props: ButtonEndpointProps) => {
    const { onClose, initialized } = useDialog();

    return (
        <ButtonEndpoint
            {...{
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
            }}
        />
    );
};

export default DialogButtonEndpoint;
export { ButtonEndpointProps as DialogButtonEndpointProps };
