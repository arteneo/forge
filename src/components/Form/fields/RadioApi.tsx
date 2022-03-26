import React from "react";
import * as Yup from "yup";
import { useForm } from "../../../components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { resolveBooleanOrFunction, resolveStringOrFunction } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import RadioElement, { RadioElementSpecificProps } from "../../../components/Form/elements/RadioElement";
import TextFieldInterface from "../../../components/Form/definitions/TextFieldInterface";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";

interface RadioApiInternalProps {
    endpoint: undefined | string | ((values: FormikValues) => undefined | string);
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type RadioApiProps = RadioApiInternalProps & Omit<RadioElementSpecificProps, "options"> & TextFieldInterface;

const RadioApi = ({
    name,
    path,
    endpoint,
    label,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    help,
    disableTranslateHelp = false,
    required = false,
    hidden = false,
    disabled = false,
    loadUseEffectDependency,
    disableTranslateOption = true,
    validationSchema,
    ...elementSpecificProps
}: RadioApiProps) => {
    if (typeof name === "undefined") {
        throw new Error("RadioApi component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, resolveValidationSchema, getError, getLabel, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();
    const handleCatch = useHandleCatch();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;
    const resolvedEndpoint = endpoint ? resolveStringOrFunction(endpoint, values) : undefined;

    const [options, setOptions] = React.useState<OptionsType>([]);

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);
    React.useEffect(() => load(), [resolvedEndpoint, loadUseEffectDependency]);

    const updateValidationSchema = () => {
        let defaultValidationSchema = Yup.string();

        if (resolvedRequired) {
            defaultValidationSchema = defaultValidationSchema.required("validation.required");
        }

        resolveValidationSchema(
            resolvedPath,
            validationSchema,
            defaultValidationSchema,
            resolvedHidden,
            resolvedRequired,
            values,
            touched,
            errors,
            name
        );
    };

    const load = () => {
        if (!resolvedEndpoint) {
            setOptions([]);
            return;
        }

        const axiosSource = axios.CancelToken.source();

        axios
            .get(resolvedEndpoint, {
                cancelToken: axiosSource.token,
            })
            .then((response: AxiosResponse) => {
                setOptions(response.data);
            })
            .catch((error: AxiosError) => {
                handleCatch(error);
            });

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    if (resolvedHidden || !isReady(resolvedPath)) {
        return null;
    }

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(resolvedPath, touched, errors, submitCount);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);

    return (
        <RadioElement
            {...{
                name,
                path: resolvedPath,
                options,
                disableTranslateOption,
                label: resolvedLabel,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                ...elementSpecificProps,
            }}
        />
    );
};

export default RadioApi;
export { RadioApiProps };
