import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { resolveBooleanOrFunction, resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import SelectElement, { SelectElementSpecificProps } from "@arteneo/forge/components/Form/elements/SelectElement";
import TextFieldPlaceholderInterface from "@arteneo/forge/components/Form/definitions/TextFieldPlaceholderInterface";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "@arteneo/forge/contexts/HandleCatch";

interface SelectApiInternalProps {
    endpoint: undefined | string | ((values: FormikValues) => undefined | string);
    modifyOptions?: (options: OptionsType) => OptionsType;
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type SelectApiProps = SelectApiInternalProps &
    Omit<SelectElementSpecificProps, "options"> &
    TextFieldPlaceholderInterface;

const SelectApi = ({
    name,
    path,
    endpoint,
    label,
    placeholder,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    enableAutoPlaceholder = false,
    disableTranslatePlaceholder = false,
    help,
    disableTranslateHelp = false,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema,
    modifyOptions,
    loadUseEffectDependency,
    disableTranslateOption = true,
    ...elementSpecificProps
}: SelectApiProps) => {
    if (typeof name === "undefined") {
        throw new Error("SelectApi component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, resolveValidationSchema, getError, getLabel, getPlaceholder, getHelp } = useForm();
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
                const options: OptionsType = response.data;

                if (typeof modifyOptions !== "undefined") {
                    setOptions(modifyOptions(options));
                    return;
                }

                setOptions(options);
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
    const resolvedPlaceholder = getPlaceholder(
        placeholder,
        values,
        touched,
        errors,
        name,
        enableAutoPlaceholder,
        disableTranslatePlaceholder
    );

    return (
        <SelectElement
            {...{
                name,
                path: resolvedPath,
                options,
                disableTranslateOption,
                label: resolvedLabel,
                placeholder: resolvedPlaceholder,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                ...elementSpecificProps,
            }}
        />
    );
};

SelectApi.defaultProps = {
    // eslint-disable-next-line
    transformInitialValue: (value: any) => {
        // Backend API is serializing it as object
        if (typeof value?.id !== "undefined") {
            return value.id;
        }

        return value;
    },
};

export default SelectApi;
export { SelectApiProps };
