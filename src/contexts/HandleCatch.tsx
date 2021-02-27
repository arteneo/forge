import React from "react";
import { useError } from "@arteneo/forge/contexts/Error";
import { isDev } from "@arteneo/forge/utils/common";
import { AxiosError } from "axios";
import { FormikHelpers, FormikValues } from "formik";
import { useSnackbar } from "@arteneo/forge/contexts/Snackbar";

interface HandleCatchContextProps {
    (error: AxiosError, helpers?: FormikHelpers<FormikValues>): void;
}

interface HandleCatchProviderProps {
    children: React.ReactNode;
}

interface ErrorsFieldErrorsProps {
    errors: string[];
    children?: ErrorsFieldProps;
}

interface ErrorsFieldProps {
    [field: string]: ErrorsFieldErrorsProps;
}

const contextInitial = () => {
    return;
};

const AXIOS_CANCELLED_UNMOUNTED = "unmounted";

const HandleCatchContext = React.createContext<HandleCatchContextProps>(contextInitial);

const HandleCatchProvider = ({ children }: HandleCatchProviderProps) => {
    const { setError } = useError();
    const { showError } = useSnackbar();

    const updateValidationErrors = (
        children: ErrorsFieldProps,
        helpers: FormikHelpers<FormikValues>,
        prefix = ""
    ): void => {
        Object.keys(children).forEach((field: string) => {
            const childField = children[field];
            if (childField?.errors) {
                childField.errors.forEach((error: string) => {
                    helpers.setFieldError(prefix + field, error);
                    helpers.setFieldTouched(prefix + field, true, false);
                });
            }

            if (childField?.children) {
                updateValidationErrors(childField.children, helpers, prefix + field + ".");
            }
        });
    };

    const handleCatch = (error: AxiosError, helpers?: FormikHelpers<FormikValues>): void => {
        if (isDev()) {
            console.log(error);

            if (error?.response?.status !== 400) {
                console.log(error.response);
            }

            if (error?.response?.status === 400) {
                showError("snackbar.form.validationError");

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
                showError("snackbar.form.validationError");
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
