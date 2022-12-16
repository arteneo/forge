import React from "react";
import axios, { AxiosError, AxiosResponse, CancelTokenSource } from "axios";
import { useSnackbar } from "../../contexts/Snackbar";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import Button, { ButtonProps } from "../../components/Common/Button";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import EndpointType from "../../definitions/EndpointType";
import { resolveEndpoint } from "../../utilities/resolve";
import { AXIOS_CANCELLED_UNMOUNTED } from "../../contexts/HandleCatch";

interface ButtonEndpointInterface {
    endpoint: EndpointType;
    onSuccess?: (
        defaultOnSuccess: () => void,
        response: AxiosResponse,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    onCatch?: (
        defaultOnCatch: () => void,
        error: AxiosError,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
}

type ButtonEndpointProps = ButtonEndpointInterface & ButtonProps;

let axiosSource: null | CancelTokenSource = null;

const ButtonEndpoint = ({
    endpoint,
    onSuccess,
    onCatch,
    snackbarLabel = "buttonEndpoint.snackbar.success",
    snackbarLabelVariables = {},
    ...props
}: ButtonEndpointProps) => {
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => () => axiosSource?.cancel(AXIOS_CANCELLED_UNMOUNTED), []);

    const requestConfig = resolveEndpoint(endpoint);
    if (typeof requestConfig === "undefined") {
        throw new Error("Resolved requestConfig is undefined");
    }

    const onClick = (): void => {
        showLoader();
        setLoading(true);

        axiosSource = axios.CancelToken.source();
        requestConfig.cancelToken = axiosSource.token;

        axios
            .request(requestConfig)
            .then((response: AxiosResponse) => {
                const defaultOnSuccess = () => {
                    showSuccess(snackbarLabel, snackbarLabelVariables);
                    hideLoader();
                    setLoading(false);
                };

                if (typeof onSuccess !== "undefined") {
                    onSuccess(defaultOnSuccess, response, setLoading);
                    return;
                }

                defaultOnSuccess();
            })
            // According to https://github.com/axios/axios/issues/3612
            // This should be typed as Error | AxiosError
            // Leaving this as it is to avoid further changes. Revisit when this will cause problems
            .catch((error: AxiosError) => {
                const defaultOnCatch = () => {
                    handleCatch(error);
                    hideLoader();

                    if (error?.message !== AXIOS_CANCELLED_UNMOUNTED) {
                        setLoading(false);
                    }
                };

                if (typeof onCatch !== "undefined") {
                    onCatch(defaultOnCatch, error, setLoading);
                    return;
                }

                defaultOnCatch();
            });
    };

    return (
        <Button
            {...{
                onClick: () => onClick(),
                loading,
                ...props,
            }}
        />
    );
};

export default ButtonEndpoint;
export { ButtonEndpointProps };
