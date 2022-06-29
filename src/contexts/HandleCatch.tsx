import React from "react";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { FormikHelpers, FormikValues } from "formik";
import { useError } from "../contexts/Error";
import { useSnackbar } from "../contexts/Snackbar";
import TranslateVariablesInterface from "../definitions/TranslateVariablesInterface";

interface HandleCatchContextProps {
    (error: AxiosError, helpers?: FormikHelpers<FormikValues>): void;
}

interface HandleCatchProviderProps {
    children: React.ReactNode;
    mode: "production" | "development";
}

interface ErrorsFieldErrorsProps {
    errors: ErrorMessage[];
    children?: ErrorsFieldProps;
}

interface ErrorsFieldProps {
    [field: string]: ErrorsFieldErrorsProps;
}

interface ErrorMessage {
    message: string;
    parameters: TranslateVariablesInterface;
}

const contextInitial = () => {
    return;
};

const AXIOS_CANCELLED_UNMOUNTED = "unmounted";

const HandleCatchContext = React.createContext<HandleCatchContextProps>(contextInitial);

const HandleCatchProvider = ({ children, mode }: HandleCatchProviderProps) => {
    const { setError } = useError();
    const { showError } = useSnackbar();
    const { t } = useTranslation();

    const updateValidationErrors = (
        children: ErrorsFieldProps,
        helpers: FormikHelpers<FormikValues>,
        prefix = ""
    ): void => {
        Object.keys(children).forEach((field: string) => {
            const childField = children[field];
            if (childField?.errors) {
                childField.errors.forEach((error: ErrorMessage) => {
                    helpers.setFieldError(prefix + field, t(error.message, error.parameters));
                    helpers.setFieldTouched(prefix + field, true, false);
                });
            }

            if (childField?.children) {
                updateValidationErrors(childField.children, helpers, prefix + field + ".");
            }
        });
    };

    const handleCatch = (error: AxiosError, helpers?: FormikHelpers<FormikValues>): void => {
        if (mode === "development") {
            console.log(error);

            if (error?.response?.status !== 400) {
                console.log(error.response);
            }

            if (error?.response?.status === 400) {
                showError("form.snackbar.validationError");

                if (helpers && error?.response?.data?.errors?.children) {
                    updateValidationErrors(error.response.data.errors.children, helpers);
                }
            }

            if (helpers) {
                helpers.setSubmitting(false);
            }

            return;
        }

        if (error?.message === AXIOS_CANCELLED_UNMOUNTED) {
            // Component has been unmounted. This is OK
            return;
        }

        switch (error?.response?.status) {
            case 400:
                showError("form.snackbar.validationError");
                if (helpers) {
                    updateValidationErrors(error.response.data.errors.children, helpers);
                }
                break;
            case 401:
                setError(401);
                break;
            case 404:
                setError(404);
                break;
            case 403:
                setError(403);
                break;
            case 500:
            default:
                setError(500);
                break;
        }

        if (helpers) {
            helpers.setSubmitting(false);
        }
    };

    return <HandleCatchContext.Provider value={handleCatch}>{children}</HandleCatchContext.Provider>;
};

const useHandleCatch = (): HandleCatchContextProps => React.useContext(HandleCatchContext);

export {
    HandleCatchContext,
    HandleCatchContextProps,
    HandleCatchProvider,
    HandleCatchProviderProps,
    useHandleCatch,
    AXIOS_CANCELLED_UNMOUNTED,
};
