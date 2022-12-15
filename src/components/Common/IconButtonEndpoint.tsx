import React from "react";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { useSnackbar } from "../../contexts/Snackbar";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import EndpointType from "../../definitions/EndpointType";
import { resolveEndpoint } from "../../utilities/resolve";
import { AXIOS_CANCELLED_UNMOUNTED } from "../../contexts/HandleCatch";

interface IconButtonEndpointInterface {
    endpoint: EndpointType;
    onSuccess?: (defaultOnSuccess: () => void, response: AxiosResponse) => void;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
}

type IconButtonEndpointProps = IconButtonEndpointInterface & IconButtonProps;

let axiosSource: null | CancelTokenSource = null;

const IconButtonEndpoint = ({
    endpoint,
    onSuccess,
    snackbarLabel = "buttonEndpoint.snackbar.success",
    snackbarLabelVariables = {},
    ...props
}: IconButtonEndpointProps) => {
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    React.useEffect(() => () => axiosSource?.cancel(AXIOS_CANCELLED_UNMOUNTED), []);

    const requestConfig = resolveEndpoint(endpoint);
    if (typeof requestConfig === "undefined") {
        throw new Error("Resolved requestConfig is undefined");
    }

    const onClick = (): void => {
        showLoader();

        axiosSource = axios.CancelToken.source();
        requestConfig.cancelToken = axiosSource.token;

        axios
            .request(requestConfig)
            .then((response: AxiosResponse) => {
                const defaultOnSuccess = () => {
                    showSuccess(snackbarLabel, snackbarLabelVariables);
                    hideLoader();
                };

                if (typeof onSuccess !== "undefined") {
                    onSuccess(defaultOnSuccess, response);
                    return;
                }

                defaultOnSuccess();
            })
            .catch((error) => {
                handleCatch(error);
                hideLoader();
            });
    };

    return (
        <IconButton
            {...{
                onClick: () => onClick(),
                ...props,
            }}
        />
    );
};

export default IconButtonEndpoint;
export { IconButtonEndpointProps };
