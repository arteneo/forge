import React from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import Button, { ButtonProps } from "../../components/Common/Button";
import EndpointType from "../../definitions/EndpointType";
import { resolveEndpoint } from "../../utilities/resolve";
import { AXIOS_CANCELLED_UNMOUNTED } from "../../contexts/HandleCatch";

interface ButtonMultiEndpointInterface {
    endpoints: EndpointType[];
    onStart?: (defaultOnStart: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onFinish?: (
        defaultOnFinish: () => void,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        cancelled: boolean
    ) => void;
    onSuccess?: (
        defaultOnSuccess: () => void,
        key: number,
        response: AxiosResponse,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    onCatch?: (
        defaultOnCatch: () => void,
        key: number,
        error: AxiosError,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        cancelled: boolean
    ) => void;
}

type ButtonMultiEndpointProps = ButtonMultiEndpointInterface & ButtonProps;

let axiosSource: null | CancelTokenSource = null;
let cancelled = false;

const ButtonMultiEndpoint = ({
    endpoints,
    onStart,
    onFinish,
    onSuccess,
    onCatch,
    ...props
}: ButtonMultiEndpointProps) => {
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        cancelled = false;
        return () => axiosSource?.cancel(AXIOS_CANCELLED_UNMOUNTED);
    }, []);

    const requestConfigs = endpoints
        .map((endpoint) => resolveEndpoint(endpoint))
        .filter((requestConfig) => typeof requestConfig !== "undefined") as AxiosRequestConfig[];
    if (requestConfigs.length === 0) {
        throw new Error("Resolved requestConfigs are empty");
    }

    const resolveRequestConfigs = async () => {
        for (const [key, requestConfig] of requestConfigs.entries()) {
            if (cancelled) {
                return;
            }

            axiosSource = axios.CancelToken.source();
            requestConfig.cancelToken = axiosSource.token;

            await axios
                .request(requestConfig)
                .then((response: AxiosResponse) => {
                    if (typeof onSuccess !== "undefined") {
                        // defaultOnSuccess is an empty function so it can be consistent and easy to compose other components
                        onSuccess(() => undefined, key, response, setLoading);
                    }
                })
                // According to https://github.com/axios/axios/issues/3612
                // This should be typed as Error | AxiosError
                // Leaving this as it is to avoid further changes. Revisit when this will cause problems
                .catch((error: AxiosError) => {
                    const defaultOnCatch = () => {
                        handleCatch(error);

                        if (error?.message === AXIOS_CANCELLED_UNMOUNTED) {
                            cancelled = true;
                        }
                    };

                    if (typeof onCatch !== "undefined") {
                        onCatch(defaultOnCatch, key, error, setLoading, error?.message === AXIOS_CANCELLED_UNMOUNTED);
                        return;
                    }

                    defaultOnCatch();
                });
        }
    };

    const onClick = async () => {
        const defaultOnStart = () => {
            showLoader();
            setLoading(true);
        };

        if (typeof onStart !== "undefined") {
            onStart(defaultOnStart, setLoading);
        } else {
            defaultOnStart();
        }

        await resolveRequestConfigs();

        const defaultOnFinish = () => {
            hideLoader();

            if (!cancelled) {
                setLoading(false);
            }
        };

        if (typeof onFinish !== "undefined") {
            onFinish(defaultOnFinish, setLoading, cancelled);
        } else {
            defaultOnFinish();
        }
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

export default ButtonMultiEndpoint;
export { ButtonMultiEndpointProps };
