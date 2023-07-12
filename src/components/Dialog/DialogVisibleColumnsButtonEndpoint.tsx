import React from "react";
import { Check } from "@mui/icons-material";
import ButtonEndpoint, { ButtonEndpointProps } from "../../components/Common/ButtonEndpoint";
import { useDialog } from "../../contexts/Dialog";
import { resolveEndpoint } from "../../utilities/resolve";
import EndpointType from "../../definitions/EndpointType";
import { useTable } from "../../components/Table/contexts/Table";
import { useVisibleColumns, VisibleColumnInterface } from "../../contexts/VisibleColumns";

interface DialogVisibleColumnsButtonEndpointProps extends Omit<ButtonEndpointProps, "endpoint"> {
    endpoint: EndpointType | ((columns: VisibleColumnInterface[], visibleColumnsKey?: string) => EndpointType);
}

const DialogVisibleColumnsButtonEndpoint = ({
    label = "visibleColumns.action.confirm",
    color = "success",
    variant = "contained",
    endIcon = <Check />,
    endpoint,
    ...props
}: DialogVisibleColumnsButtonEndpointProps) => {
    const { onClose, initialized } = useDialog();
    const { reloadVisibleColumns, visibleColumnsKey } = useTable();
    const { columns } = useVisibleColumns();

    const defaultRequestConfig = {
        method: "post",
        data: {
            tableKey: visibleColumnsKey,
            columns,
        },
    };

    const resolvedEndpoint = typeof endpoint === "function" ? endpoint(columns, visibleColumnsKey) : endpoint;
    const requestConfig = resolveEndpoint(resolvedEndpoint);
    const resolvedRequestConfig = Object.assign(defaultRequestConfig, requestConfig);

    return (
        <ButtonEndpoint
            {...{
                label,
                color,
                variant,
                endIcon,
                snackbarLabel: "visibleColumns.snackbar.confirm",
                ...props,
                endpoint: resolvedRequestConfig,
                disabled: initialized ? props.disabled : true,
                onSuccess: (defaultOnSuccess, response, setLoading) => {
                    const internalDefaultOnSuccess = () => {
                        defaultOnSuccess();
                        reloadVisibleColumns();
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
export { DialogVisibleColumnsButtonEndpointProps };
