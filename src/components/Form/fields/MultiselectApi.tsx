import React from "react";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import { resolveFieldEndpoint } from "../../../utilities/resolve";
import Multiselect, { MultiselectProps } from "../../../components/Form/fields/Multiselect";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import FieldEndpointType from "../../../components/Form/definitions/FieldEndpointType";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";

interface MultiselectApiSpecificProps {
    endpoint: FieldEndpointType;
    processResponse?: (response: AxiosResponse) => OptionsType;
    // Used to reload options on demand
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type MultiselectApiProps = MultiselectApiSpecificProps & Omit<MultiselectProps, "options">;

const MultiselectApi = ({
    endpoint,
    processResponse = (response) => response.data,
    loadUseEffectDependency,
    disableTranslateOption = true,
    ...multiselectProps
}: MultiselectApiProps) => {
    const handleCatch = useHandleCatch();
    const { values }: FormikProps<FormikValues> = useFormikContext();

    const [options, setOptions] = React.useState<OptionsType>([]);

    const requestConfig = resolveFieldEndpoint(endpoint, values);

    useDeepCompareEffectNoCheck(() => load(), [requestConfig, loadUseEffectDependency]);

    const load = () => {
        if (typeof requestConfig === "undefined") {
            setOptions([]);
            return;
        }

        const axiosSource = axios.CancelToken.source();
        // requestConfig needs to be copied to avoid firing useDeepCompareEffectNoCheck
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
        <Multiselect
            {...{
                options,
                disableTranslateOption,
                ...multiselectProps,
            }}
        />
    );
};

MultiselectApi.defaultProps = {
    // eslint-disable-next-line
    transformInitialValue: (value: any) => {
        if (Array.isArray(value)) {
            return value.map((valueOption) => {
                // Backend API is serializing it as object
                if (typeof valueOption?.id !== "undefined") {
                    return valueOption.id;
                }

                return valueOption;
            });
        }

        return value;
    },
};

export default MultiselectApi;
export { MultiselectApiProps, MultiselectApiSpecificProps };
