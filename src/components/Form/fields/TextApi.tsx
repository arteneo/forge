import React from "react";
import Text, { TextProps } from "@arteneo/forge/components/Form/fields/Text";
import { FormikProps, FormikValues, getIn, useFormikContext } from "formik";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import { resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AXIOS_CANCELLED_UNMOUNTED, useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";

interface TextApiPropsInternalProps {
    endpoint: undefined | string | ((value: number | string, values: FormikValues) => undefined | string);
    getValueRepresentation?: (value: OptionInterface) => undefined | number | string;
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type TextApiProps = TextApiPropsInternalProps & TextProps;

/**
 * Component works as disabled field showing option chosen in Select - .representation - it is usefull in collections
 */
const TextApi = ({
    name,
    endpoint,
    path,
    value,
    loadUseEffectDependency,
    getValueRepresentation = (value: OptionInterface) => value.representation,
    disabled = true,
    ...elementSpecificProps
}: TextApiProps) => {
    if (typeof name === "undefined") {
        throw new Error("Text component: name is required prop. By default it is injected by FormContent.");
    }

    const { showLoader, hideLoader } = useLoader();
    const handleCatch = useHandleCatch();
    const { values }: FormikProps<FormikValues> = useFormikContext();

    const resolvedPath = path ? path : name;
    let resolvedValue = value ? value : getIn(values, resolvedPath, "");
    if (typeof resolvedValue === "object") {
        resolvedValue = resolvedValue?.id;
    }

    const resolvedEndpoint = endpoint ? resolveStringOrFunction(endpoint, resolvedValue, values) : undefined;
    // eslint-disable-next-line
    const [option, setOption] = React.useState<undefined | OptionInterface>(undefined);

    React.useEffect(() => load(), [resolvedEndpoint, loadUseEffectDependency]);

    const load = () => {
        if (!resolvedEndpoint) {
            setOption(undefined);
            return;
        }
        showLoader();
        const axiosSource = axios.CancelToken.source();

        axios
            .get(resolvedEndpoint, {
                cancelToken: axiosSource.token,
            })
            .then((response: AxiosResponse) => {
                setOption(response.data);
                hideLoader();
            })
            .catch((error: AxiosError) => {
                hideLoader();
                handleCatch(error);
            });

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    return (
        <Text
            {...{
                name,
                value: option ? getValueRepresentation(option) : "",
                disabled: disabled,
                ...elementSpecificProps,
            }}
        />
    );
};

export default TextApi;
export { TextApiProps };
