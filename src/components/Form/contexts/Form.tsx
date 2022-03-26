import React from "react";
import { useTranslation } from "react-i18next";
import { FormikValues, FormikTouched, FormikErrors, getIn } from "formik";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AXIOS_CANCELLED_UNMOUNTED, useHandleCatch } from "../../../contexts/HandleCatch";
import { resolveReactNodeOrFunction, resolveAnyOrFunction } from "../../../utils/resolve";
import FieldHelpType from "../../../components/Form/definitions/FieldHelpType";
import FieldLabelType from "../../../components/Form/definitions/FieldLabelType";
import FieldPlaceholderType from "../../../components/Form/definitions/FieldPlaceholderType";

interface FormContextProps {
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
}

interface FormProviderProps {
    children: React.ReactNode;
    initialValues?: FormikValues;
    initializeEndpoint?: string;
    translateLabelPrefix?: string;
}

const contextInitial = {
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
};

const FormContext = React.createContext<FormContextProps>(contextInitial);

const FormProvider = ({
    children,
    initialValues,
    initializeEndpoint,
    translateLabelPrefix = "form.",
}: FormProviderProps) => {
    const { t } = useTranslation();

    const [formikInitialValues, setFormikInitialValues] = React.useState({});
    const handleCatch = useHandleCatch();

    // TODO Changing intitialValues might not actually trigger useEffect due nested nature. Test and decide
    React.useEffect(() => initializeValues(), [initializeEndpoint, initialValues]);

    const initializeValues = () => {
        if (typeof initialValues !== "undefined") {
            setFormikInitialValues(initialValues);
            return;
        }

        if (typeof initializeEndpoint === "undefined") {
            return;
        }

        const axiosSource = axios.CancelToken.source();

        axios
            .get(initializeEndpoint, {
                cancelToken: axiosSource.token,
            })
            .then((response: AxiosResponse) => {
                setFormikInitialValues(response.data);
            })
            .catch((error: AxiosError) => handleCatch(error));

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
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

        return t(String(getIn(errors, path)));
    };

    const getLabel = (
        label: FieldLabelType,
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
        disableAutoLabel?: boolean,
        disableTranslateLabel?: boolean
    ): undefined | React.ReactNode => {
        let resolvedLabel = resolveReactNodeOrFunction(label, values, touched, errors, name);

        if (typeof resolvedLabel === "undefined" && !disableAutoLabel) {
            resolvedLabel = name;
        }

        if (typeof resolvedLabel === "string" && !disableTranslateLabel) {
            return t(translateLabelPrefix + resolvedLabel);
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
                return t(translateLabelPrefix + resolvedPlaceholder);
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
                formikInitialValues,
                hasError,
                getError,
                getLabel,
                getPlaceholder,
                getHelp,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

const useForm = (): FormContextProps => React.useContext(FormContext);

export { FormContext, FormContextProps, FormProvider, FormProviderProps, useForm };
