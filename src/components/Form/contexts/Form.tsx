import React from "react";
import { useTranslation } from "react-i18next";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import { FormikValues, FormikTouched, FormikErrors, getIn } from "formik";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AXIOS_CANCELLED_UNMOUNTED, useHandleCatch } from "../../../contexts/HandleCatch";
import FieldHelpType from "../../../components/Form/definitions/FieldHelpType";
import FieldLabelType from "../../../components/Form/definitions/FieldLabelType";
import FieldLabelVariablesType from "../../../components/Form/definitions/FieldLabelVariablesType";
import FieldPlaceholderType from "../../../components/Form/definitions/FieldPlaceholderType";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";
import FieldResolveInterface from "../../../components/Form/definitions/FieldResolveInterface";
import FieldResolvedInterface from "../../../components/Form/definitions/FieldResolvedInterface";
import FieldPlaceholderResolveInterface from "../../../components/Form/definitions/FieldPlaceholderResolveInterface";
import FieldPlaceholderResolvedInterface from "../../../components/Form/definitions/FieldPlaceholderResolvedInterface";
import EndpointType from "../../../definitions/EndpointType";
import { filterInitialValues, transformInitialValues } from "../../../utilities/common";
import {
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveReactNodeOrFunction,
    resolveAnyOrFunction,
    resolveEndpoint,
} from "../../../utilities/resolve";

interface FormContextProps {
    initialValues?: FormikValues;
    initializedValuesResponse?: AxiosResponse;
    formikInitialValues: FormikValues;
    hasError: (
        path: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        submitCount: number
    ) => boolean;
    getError: (
        path: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        submitCount: number
    ) => undefined | string;
    getLabel: (
        label: FieldLabelType,
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
        labelVariables?: FieldLabelVariablesType,
        disableAutoLabel?: boolean,
        disableTranslateLabel?: boolean
    ) => undefined | React.ReactNode;
    getPlaceholder: (
        placeholder: FieldPlaceholderType,
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
        enableAutoPlaceholder?: boolean,
        disableTranslatePlaceholder?: boolean
    ) => string | undefined;
    getHelp: (
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
        help?: FieldHelpType,
        disableTranslateHelp?: boolean
    ) => undefined | React.ReactNode;
    resolveField: (props: FieldResolveInterface) => FieldResolvedInterface;
    resolvePlaceholderField: (props: FieldPlaceholderResolveInterface) => FieldPlaceholderResolvedInterface;
}

interface FormProviderProps {
    children: React.ReactNode;
    fields: FieldsInterface;
    initialValues?: FormikValues;
    initializeEndpoint?: EndpointType;
    /**
     * Processing initial values by default will remove any non-field related initialValue
     * It will also transform values according to fields requirements
     */
    processInitialValues?: (
        fields: FieldsInterface,
        initialValues?: FormikValues,
        response?: AxiosResponse
    ) => FormikValues;
}

const contextInitial = {
    initialValues: {},
    initializedValuesResponse: undefined,
    formikInitialValues: {},
    hasError: () => {
        return false;
    },
    getError: () => {
        return undefined;
    },
    getLabel: () => {
        return undefined;
    },
    getPlaceholder: () => {
        return undefined;
    },
    getHelp: () => {
        return undefined;
    },
    resolveField: () => {
        return {
            name: "",
            path: "",
            required: false,
            disabled: false,
            hidden: false,
            hasError: false,
        };
    },
    resolvePlaceholderField: () => {
        return {
            name: "",
            path: "",
            required: false,
            disabled: false,
            hidden: false,
            hasError: false,
        };
    },
};

const FormContext = React.createContext<FormContextProps>(contextInitial);

const FormProvider = ({
    children,
    fields,
    initialValues,
    initializeEndpoint,
    processInitialValues,
}: FormProviderProps) => {
    const { t } = useTranslation();
    const handleCatch = useHandleCatch();

    const [initialized, setInitialized] = React.useState(false);
    const [formikInitialValues, setFormikInitialValues] = React.useState({});
    const [initializedValuesResponse, setInitializedValuesResponse] = React.useState<undefined | AxiosResponse>(
        undefined
    );

    const requestConfig = resolveEndpoint(initializeEndpoint);

    useDeepCompareEffectNoCheck(() => initializeValues(), [requestConfig, initialValues]);

    const initializeValues = () => {
        setInitialized(false);

        if (typeof initialValues !== "undefined" && typeof requestConfig === "undefined") {
            setFormikInitialValues(callableProcessInitialValues(fields, initialValues));
            setInitialized(true);
            return;
        }

        if (typeof requestConfig === "undefined") {
            setInitialized(true);
            return;
        }

        const axiosSource = axios.CancelToken.source();
        // requestConfig needs to be copied to avoid firing useDeepCompareEffectNoCheck
        const axiosRequestConfig = Object.assign({ cancelToken: axiosSource.token }, requestConfig);

        axios
            .request(axiosRequestConfig)
            .then((response: AxiosResponse) => {
                setInitializedValuesResponse(response);
                setFormikInitialValues(callableProcessInitialValues(fields, initialValues, response));
                setInitialized(true);
            })
            .catch((error: AxiosError) => {
                setInitialized(true);
                handleCatch(error);
            });

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    const resolveField = ({
        name,
        values,
        touched,
        errors,
        submitCount,
        ...field
    }: FieldResolveInterface): FieldResolvedInterface => {
        if (typeof name === "undefined") {
            throw new Error("Missing name prop. By default it is injected while rendering.");
        }

        const path = field.path ? field.path : name;
        const required = resolveBooleanOrFunction(field.required, values, touched, errors, name);
        const disabled = resolveBooleanOrFunction(field.disabled, values, touched, errors, name);
        const value = getIn(values, path, undefined);
        let validate: undefined | string = undefined;
        if (typeof field.validate !== "undefined") {
            validate = resolveStringOrFunction(
                field.validate,
                value,
                required,
                disabled,
                values,
                name,
                path,
                touched,
                errors
            );
        }

        if (typeof validate !== "undefined" && !field.disableValidateTranslate) {
            validate = t(validate) ?? "";
        }

        return {
            name,
            path,
            hidden: resolveBooleanOrFunction(field.hidden, values, touched, errors, name),
            required,
            disabled,
            help: getHelp(values, touched, errors, name, field.help, field.disableTranslateHelp),
            error: getError(path, touched, errors, submitCount),
            hasError: hasError(path, touched, errors, submitCount),
            label: getLabel(
                field.label,
                values,
                touched,
                errors,
                name,
                field.labelVariables,
                field.disableAutoLabel,
                field.disableTranslateLabel
            ),
            validate,
        };
    };

    const resolvePlaceholderField = ({
        placeholder,
        enableAutoPlaceholder,
        disableTranslatePlaceholder,
        ...field
    }: FieldPlaceholderResolveInterface): FieldPlaceholderResolvedInterface => {
        if (typeof field.name === "undefined") {
            throw new Error("Missing name prop. By default it is injected while rendering.");
        }

        return {
            ...resolveField(field),
            placeholder: getPlaceholder(
                placeholder,
                field.values,
                field.touched,
                field.errors,
                field.name,
                enableAutoPlaceholder,
                disableTranslatePlaceholder
            ),
        };
    };

    const defaultProcessInitialValues = (
        fields: FieldsInterface,
        initialValues?: FormikValues,
        response?: AxiosResponse
    ): FormikValues => {
        return transformInitialValues(fields, filterInitialValues(fields, initialValues, response?.data));
    };

    const callableProcessInitialValues = (
        fields: FieldsInterface,
        initialValues?: FormikValues,
        response?: AxiosResponse
    ): FormikValues => {
        if (typeof processInitialValues !== "undefined") {
            return processInitialValues(fields, initialValues, response);
        }

        return defaultProcessInitialValues(fields, initialValues, response);
    };

    const hasError = (
        path: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        submitCount: number
    ): boolean => {
        const error = getIn(errors, path);
        return (Boolean(getIn(touched, path)) || submitCount > 0) && typeof error === "string" && Boolean(error);
    };

    const getError = (
        path: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        submitCount: number
    ): undefined | string => {
        if (!hasError(path, touched, errors, submitCount)) {
            return undefined;
        }

        return String(getIn(errors, path));
    };

    const getLabel = (
        label: FieldLabelType,
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
        labelVariables?: FieldLabelVariablesType,
        disableAutoLabel?: boolean,
        disableTranslateLabel?: boolean
    ): undefined | React.ReactNode => {
        let resolvedLabel = resolveReactNodeOrFunction(label, values, touched, errors, name);

        if (typeof resolvedLabel === "undefined" && !disableAutoLabel) {
            resolvedLabel = name;
        }

        if (typeof resolvedLabel === "string" && !disableTranslateLabel) {
            const resolvedLabelVariables =
                typeof labelVariables !== "undefined"
                    ? resolveAnyOrFunction(labelVariables, values, touched, errors, name)
                    : undefined;

            return <>{t("label." + resolvedLabel, resolvedLabelVariables)}</>;
        }

        return resolvedLabel;
    };

    const getPlaceholder = (
        placeholder: FieldPlaceholderType,
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
        enableAutoPlaceholder?: boolean,
        disableTranslatePlaceholder?: boolean
    ) => {
        let resolvedPlaceholder = resolveAnyOrFunction(placeholder, values, touched, errors, name);

        if (typeof resolvedPlaceholder === "undefined" && enableAutoPlaceholder) {
            resolvedPlaceholder = name;

            if (!disableTranslatePlaceholder) {
                return t("label." + resolvedPlaceholder);
            }
        }

        if (typeof resolvedPlaceholder === "string" && !disableTranslatePlaceholder) {
            return t("placeholder." + resolvedPlaceholder);
        }

        return resolvedPlaceholder;
    };

    const getHelp = (
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
        help?: FieldHelpType,
        disableTranslateHelp?: boolean
    ): undefined | React.ReactNode => {
        let resolvedHelp: undefined | React.ReactNode = undefined;

        if (typeof help === "boolean") {
            resolvedHelp = "help." + name;
        }

        if (typeof resolvedHelp === "undefined") {
            resolvedHelp = resolveReactNodeOrFunction(help, values, touched, errors, name);
        }

        if (typeof resolvedHelp === "string" && !disableTranslateHelp) {
            return t(resolvedHelp);
        }

        return resolvedHelp;
    };

    return (
        <FormContext.Provider
            value={{
                initialValues,
                initializedValuesResponse,
                formikInitialValues,
                resolveField,
                resolvePlaceholderField,
                hasError,
                getError,
                getLabel,
                getPlaceholder,
                getHelp,
            }}
        >
            {initialized && children}
        </FormContext.Provider>
    );
};

const useForm = (): FormContextProps => React.useContext(FormContext);

export { FormContext, FormContextProps, FormProvider, FormProviderProps, useForm };
