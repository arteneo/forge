import React from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import axios, { AxiosError, AxiosResponse } from "axios";
import { resolveFieldEndpoint } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import Radio, { RadioProps } from "../../../components/Form/fields/Radio";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import FieldEndpointType from "../../../components/Form/definitions/FieldEndpointType";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";

interface RadioApiSpecificProps {
    endpoint: FieldEndpointType;
    processResponse?: (response: AxiosResponse) => OptionsType;
    // Used to reload options on demand
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type RadioApiProps = RadioApiSpecificProps & Omit<RadioProps, "options">;

const RadioApi = ({
    endpoint,
    processResponse = (response) => response.data,
    loadUseEffectDependency,
    disableTranslateOption = true,
    ...radioProps
}: RadioApiProps) => {
    const handleCatch = useHandleCatch();
    const { values }: FormikProps<FormikValues> = useFormikContext();

    const [options, setOptions] = React.useState<OptionsType>([]);

    const requestConfig = resolveFieldEndpoint(endpoint, values);

    useDeepCompareEffect(() => load(), [requestConfig, loadUseEffectDependency]);

    const load = () => {
        if (typeof requestConfig === "undefined") {
            setOptions([]);
            return;
        }

        const axiosSource = axios.CancelToken.source();
        // requestConfig needs to be copied to avoid firing useDeepCompareEffect
        const axiosRequestConfig = Object.assign({ cancelToken: axiosSource.token }, requestConfig);

        axios
            .request(axiosRequestConfig)
            .then((response: AxiosResponse) => setOptions(processResponse(response)))
            .catch((error: AxiosError) => handleCatch(error));

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    return (
        <Radio
            {...{
                options,
                disableTranslateOption,
                ...radioProps,
            }}
        />
    );
};

RadioApi.defaultProps = {
    // eslint-disable-next-line
    transformInitialValue: (value: any) => {
        // Backend API is serializing it as object
        if (typeof value?.id !== "undefined") {
            return value.id;
        }

        return value;
    },
};

export default RadioApi;
export { RadioApiProps, RadioApiSpecificProps };
