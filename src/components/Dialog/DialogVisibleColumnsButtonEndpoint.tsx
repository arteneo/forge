import React from "react";
import { Check } from "@mui/icons-material";
import ButtonEndpoint, { ButtonEndpointProps } from "../../components/Common/ButtonEndpoint";
import { useDialog } from "../../contexts/Dialog";

const DialogVisibleColumnsButtonEndpoint = ({
    label = "action.confirm",
    color = "success",
    variant = "contained",
    endIcon = <Check />,
    ...props
}: ButtonEndpointProps) => {
    const { onClose, initialized } = useDialog();

    // TODO figure out how to merge endpoint definition. Maybye function (columns, visibleColumnsKey) with a default value?
    // TODO reload columns

    return (
        <ButtonEndpoint
            {...{
                label,
                color,
                variant,
                endIcon,
                snackbarLabel: "visibleColumns.snackbar",
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

export default DialogVisibleColumnsButtonEndpoint;
export { ButtonEndpointProps as DialogVisibleColumnsButtonEndpointProps };
