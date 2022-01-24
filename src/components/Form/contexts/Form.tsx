import React from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { FormikValues, FormikTouched, FormikErrors, getIn } from "formik";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AXIOS_CANCELLED_UNMOUNTED, useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { populate } from "@arteneo/forge/utils/common";
import { resolveReactNodeOrFunction, resolveAnyOrFunction } from "@arteneo/forge/utils/resolve";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";
import FieldHelpType from "@arteneo/forge/components/Form/definitions/FieldHelpType";
import FieldLabelType from "@arteneo/forge/components/Form/definitions/FieldLabelType";
import FieldPlaceholderType from "@arteneo/forge/components/Form/definitions/FieldPlaceholderType";
import ValidationSchemaInterface from "@arteneo/forge/components/Form/definitions/ValidationSchemaInterface";

interface FormContextProps {
    formikInitialValues: FormikValues;
    formikValidationSchema: ValidationSchemaInterface;
    isReady: (path: string) => boolean;
    setValidationSchema: (path: string, validationSchema: ValidationSchemaInterface) => void;
    resolveValidationSchema: (
        path: string,
        validationSchema: ValidationSchemaInterface,
        defaultValidationSchema: ValidationSchemaInterface,
        hidden: boolean,
        required: boolean,
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string
    ) => void;
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
    // eslint-disable-next-line
    object?: any;
    // eslint-disable-next-line
    setObject: (object: any) => void;
    // eslint-disable-next-line
    submitAction?: any;
    // eslint-disable-next-line
    setSubmitAction: (submitAction: any) => void;
}

interface FormProviderProps {
    children: React.ReactNode;
    fields?: FieldsInterface;
    initialValues?: FormikValues;
    initializeEndpoint?: string;
    translateLabelPrefix?: string;
    /**
     * Idea of isReady function used in each FieldX component to render X view only after validationSchema is initialized.
     * This allows to lower number of rerenders.
     * By default components are always ready.
     */
    isReady?: (formikValidationSchema: ValidationSchemaInterface, path: string) => boolean;
}

const contextInitial = {
    formikInitialValues: {},
    formikValidationSchema: {},
    isReady: () => true,
    setValidationSchema: () => {
        return;
    },
    resolveValidationSchema: () => {
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
    getPlaceholder: () => {
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

const FormContext = React.createContext<FormContextProps>(contextInitial);

const FormProvider = ({
    children,
    fields,
    initialValues,
    initializeEndpoint,
    translateLabelPrefix = "label.",
    isReady = () => true,
}: FormProviderProps) => {
    const { t } = useTranslation();

    const [formikValidationSchema, setFormikValidationSchema] = React.useState(Yup.object().shape({}));
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

    const setValidationSchema = (path: string, validationSchema: ValidationSchemaInterface) => {
        setFormikValidationSchema((formikValidationSchema: ValidationSchemaInterface) => {
            const pathParts = path.split(".");

            let validationSchemaObject: undefined | ValidationSchemaInterface = undefined;
            pathParts.reverse().forEach((pathPart) => {
                const isArrayPart = /^\d+$/.test(pathPart);

                const yupShape: ValidationSchemaInterface = {};

                if (typeof validationSchemaObject !== "undefined") {
                    yupShape[pathPart] = validationSchemaObject;
                } else if (typeof validationSchema !== "undefined") {
                    yupShape[pathPart] = validationSchema;
                }

                if (isArrayPart) {
                    if (typeof validationSchemaObject === "undefined") {
                        throw Error("Last pathPart is a number. This should not happen, please check you code");
                    }

                    validationSchemaObject = Yup.array().of(validationSchemaObject);
                } else {
                    validationSchemaObject = Yup.object().shape(yupShape);
                }
            });

            // Experimental solution
            // formikValidationSchema.concat(validationSchemaObject); does not override fields properly
            // validationSchemaObject.concat(formikValidationSchema); does not override fields properly
            return formikValidationSchema.shape(validationSchemaObject.fields);
        });
    };

    const resolveValidationSchema = (
        path: string,
        validationSchema: ValidationSchemaInterface,
        defaultValidationSchema: ValidationSchemaInterface,
        hidden: boolean,
        required: boolean,
        values: FormikValues,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        name: string
    ) => {
        if (hidden) {
            setValidationSchema(path, undefined);
            return;
        }

        if (validationSchema) {
            const resolvedValidationSchema = resolveAnyOrFunction(
                validationSchema,
                defaultValidationSchema,
                required,
                hidden,
                values,
                touched,
                errors,
                name
            );
            setValidationSchema(path, resolvedValidationSchema);
            return;
        }

        setValidationSchema(path, defaultValidationSchema);
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

    const componentIsReady = (path: string): boolean => {
        if (isReady) {
            return isReady(formikValidationSchema, path);
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
                resolveValidationSchema,
                hasError,
                getError,
                getLabel,
                getPlaceholder,
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

const useForm = (): FormContextProps => React.useContext(FormContext);

export { FormContext, FormContextProps, FormProvider, FormProviderProps, useForm };
