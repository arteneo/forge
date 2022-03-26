import React from "react";
import { useForm } from "../../../components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useHandleCatch } from "../../../contexts/HandleCatch";
import { Formik, FormikHelpers, FormikValues, Form, FormikConfig } from "formik";
import { resolveStringOrFunction } from "../../../utils/resolve";
import { useSnackbar } from "../../../contexts/Snackbar";
import { useLoader } from "../../../contexts/Loader";
import { Optional } from "../../../utils/TypescriptOperators";

interface FormContentProps {
    children: React.ReactNode;
    changeSubmitValues?: (values: FormikValues) => FormikValues;
    onSubmitSuccess?: (
        defaultOnSubmitSuccess: () => void,
        helpers: FormikHelpers<FormikValues>,
        response: AxiosResponse
    ) => void;
    onSubmit?: (values: FormikValues, helpers: FormikHelpers<FormikValues>) => void;
    endpoint?: string | ((values: FormikValues) => string);
    formikProps?: Optional<Optional<FormikConfig<FormikValues>, "initialValues">, "onSubmit">;
}

const FormContent = ({
    children,
    changeSubmitValues,
    onSubmitSuccess,
    endpoint,
    onSubmit,
    formikProps,
}: FormContentProps) => {
    const { formikInitialValues } = useForm();
    const handleCatch = useHandleCatch();
    const { showSuccess } = useSnackbar();
    const { showLoader, hideLoader } = useLoader();

    if (!endpoint && !onSubmit) {
        // endpoint check just for TS
        throw new Error(
            "FormContent component: Endpoint parameter is required when using default onSubmit. Possibly not passed to Form component."
        );
    }

    const defaultOnSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
        if (!endpoint) {
            // endpoint check just for TS
            throw new Error();
        }

        showLoader();

        axios
            .post(resolveStringOrFunction(endpoint, values), changeSubmitValues ? changeSubmitValues(values) : values)
            .then((response: AxiosResponse) => {
                const defaultOnSubmitSuccess = () => {
                    showSuccess("snackbar.form.submitted");
                    helpers.setSubmitting(false);

                    hideLoader();
                };

                if (onSubmitSuccess) {
                    onSubmitSuccess(defaultOnSubmitSuccess, helpers, response);
                    return;
                }

                defaultOnSubmitSuccess();
            })
            .catch((error: AxiosError) => {
                handleCatch(error, helpers);
                hideLoader();
            });
    };

    const _onSubmit = onSubmit
        ? (values: FormikValues, helpers: FormikHelpers<FormikValues>) => onSubmit(values, helpers)
        : defaultOnSubmit;

    return (
        <Formik initialValues={formikInitialValues} onSubmit={_onSubmit} enableReinitialize {...formikProps}>
            <Form>{children}</Form>
        </Formik>
    );
};

export default FormContent;
export { FormContentProps };
