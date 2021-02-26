import React from "react";
import { useTranslation } from "react-i18next";
import { FormikValues, FormikTouched, FormikErrors, getIn, setIn } from "formik";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AXIOS_CANCELLED_UNMOUNTED, useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { populate } from "@arteneo/forge/utils/common";
import { resolveReactNodeOrFunction } from "@arteneo/forge/utils/resolve";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";
import FieldHelpType from "@arteneo/forge/components/Form/definitions/FieldHelpType";
import FieldLabelType from "@arteneo/forge/components/Form/definitions/FieldLabelType";

interface ContextProps {
    formikInitialValues: FormikValues;
    // eslint-disable-next-line
    formikValidationSchema: any;
    isReady: (name: string) => boolean;
    // eslint-disable-next-line
    setValidationSchema: (name: string, validationSchema: any) => void;
    hasError: (name: string, touched: FormikTouched<FormikValues>, errors: FormikErrors<FormikValues>) => boolean;
    getError: (
        name: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>
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
    getHelp: (
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
        help?: FieldHelpType,
        disableTranslateHelp?: boolean
    ) => undefined | React.ReactNode;
    // eslint-disable-next-line
    object?: any;
    // eslint-disable-next-line
    setObject: (object: any) => void;
    // eslint-disable-next-line
    submitAction?: any;
    // eslint-disable-next-line
    setSubmitAction: (submitAction: any) => void;
}

interface ProviderProps {
    children: React.ReactNode;
    fields?: FieldsInterface;
    initialValues?: FormikValues;
    initializeEndpoint?: string;
    /**
     * Idea of isReady function used in each FieldX component to render X view only after validationSchema is initialized.
     * This allows to lower number of rerenders.
     * By default components are always ready.
     */
    // eslint-disable-next-line
    isReady?: (formikValidationSchema: any, name: string) => boolean;
}

const contextInitial = {
    formikInitialValues: {},
    formikValidationSchema: {},
    isReady: () => true,
    setValidationSchema: () => {
        return;
    },
    hasError: () => {
        return false;
    },
    getError: () => {
        return undefined;
    },
    getLabel: () => {
        return undefined;
    },
    getHelp: () => {
        return undefined;
    },
    object: undefined,
    setObject: () => {
        return;
    },
    submitAction: undefined,
    setSubmitAction: () => {
        return;
    },
};

const FormContext = React.createContext<ContextProps>(contextInitial);

const FormProvider: React.FC<ProviderProps> = ({
    children,
    fields,
    initialValues,
    initializeEndpoint,
    isReady,
}: ProviderProps) => {
    const { t } = useTranslation();

    const [formikValidationSchema, setFormikValidationSchema] = React.useState({});
    const [formikInitialValues, setFormikInitialValues] = React.useState({});
    const [object, setObject] = React.useState(undefined);
    const [submitAction, setSubmitAction] = React.useState(undefined);
    const handleCatch = useHandleCatch();

    React.useEffect(() => initializeValues(), [initializeEndpoint, initialValues]);

    const initializeValues = () => {
        if (typeof initializeEndpoint === "undefined" && typeof initialValues === "undefined") {
            return;
        }

        if (typeof fields === "undefined") {
            throw new Error(
                "FormProvider component: fields prop is required to use initializeEndpoint or initialValues."
            );
        }

        if (typeof initializeEndpoint === "undefined") {
            setFormikInitialValues(() => ({
                ...populate(fields, {}, initialValues || {}),
            }));
            return;
        }

        const axiosSource = axios.CancelToken.source();

        axios
            .get(initializeEndpoint, {
                cancelToken: axiosSource.token,
            })
            .then((response: AxiosResponse) => {
                setObject(response.data);
                setFormikInitialValues(() => ({
                    ...populate(fields, {}, initialValues || {}, response.data),
                }));
            })
            .catch((error: AxiosError) => handleCatch(error));

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    // eslint-disable-next-line
    const setValidationSchema = (name: string, validationSchema: any) => {
        // eslint-disable-next-line
        setFormikValidationSchema((formikValidationSchema: any) =>
            setIn(formikValidationSchema, name, validationSchema)
        );
    };

    const hasError = (
        name: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>
    ): boolean => {
        const error = getIn(errors, name);
        return Boolean(getIn(touched, name)) && typeof error === "string" && Boolean(error);
    };

    const getError = (
        name: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>
    ): undefined | string => {
        if (!hasError(name, touched, errors)) {
            return undefined;
        }

        return t(String(getIn(errors, name)));
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
            return t("label." + resolvedLabel);
        }

        return resolvedLabel;
    };

    const getHelp = (
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string,
        help?: FieldHelpType,
        disableTranslateHelp?: boolean
    ): undefined | React.ReactNode => {
        let resolvedHelp = undefined;

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

    const componentIsReady = (name: string): boolean => {
        if (isReady) {
            return isReady(formikValidationSchema, name);
        }

        return true;
    };

    return (
        <FormContext.Provider
            value={{
                isReady: componentIsReady,
                formikInitialValues,
                formikValidationSchema,
                setValidationSchema,
                hasError,
                getError,
                getLabel,
                getHelp,
                object,
                setObject,
                submitAction,
                setSubmitAction,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

FormProvider.defaultProps = {
    isReady: () => true,
};

const useForm = (): ContextProps => React.useContext(FormContext);

export { FormContext, FormProvider, useForm };
