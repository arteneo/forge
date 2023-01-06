import React from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Formik, FormikHelpers, FormikValues, Form, FormikConfig } from "formik";
import { useForm } from "../../../components/Form/contexts/Form";
import { useHandleCatch } from "../../../contexts/HandleCatch";
import { resolveFieldEndpoint } from "../../../utilities/resolve";
import { useSnackbar } from "../../../contexts/Snackbar";
import { useLoader } from "../../../contexts/Loader";
import Optional from "../../../definitions/Optional";
import FieldEndpointType from "../../../components/Form/definitions/FieldEndpointType";
import TranslateVariablesInterface from "../../../definitions/TranslateVariablesInterface";

interface FormContentProps {
    children: React.ReactNode;
    changeSubmitValues?: (values: FormikValues) => FormikValues;
    onSubmitStart?: (defaultOnStart: () => void, helpers: FormikHelpers<FormikValues>) => void;
    onSubmitSuccess?: (
        defaultOnSubmitSuccess: () => void,
        helpers: FormikHelpers<FormikValues>,
        response: AxiosResponse
    ) => void;
    onSubmitCatch?: (defaultOnSubmitCatch: () => void, helpers: FormikHelpers<FormikValues>, error: AxiosError) => void;
    onSubmit?: (values: FormikValues, helpers: FormikHelpers<FormikValues>) => void;
    endpoint?: FieldEndpointType;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
    formikProps?: Optional<Optional<FormikConfig<FormikValues>, "initialValues">, "onSubmit">;
}

const FormContent = ({
    children,
    endpoint,
    onSubmitStart,
    onSubmitSuccess,
    onSubmitCatch,
    onSubmit,
    changeSubmitValues,
    snackbarLabel = "form.snackbar.success",
    snackbarLabelVariables,
    formikProps,
}: FormContentProps) => {
    const { formikInitialValues } = useForm();
    const handleCatch = useHandleCatch();
    const { showSuccess } = useSnackbar();
    const { showLoader, hideLoader } = useLoader();

    const defaultOnSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
        const requestConfig = resolveFieldEndpoint(endpoint, values);

        if (typeof requestConfig === "undefined") {
            throw new Error("Resolved requestConfig is undefined");
        }

        const defaultOnSubmitStart = () => {
            showLoader();
        };

        if (typeof onSubmitStart !== "undefined") {
            onSubmitStart(defaultOnSubmitStart, helpers);
        } else {
            defaultOnSubmitStart();
        }

        requestConfig.method = requestConfig.method ?? "post";
        requestConfig.data = changeSubmitValues ? changeSubmitValues(values) : values;

        axios
            .request(requestConfig)
            .then((response: AxiosResponse) => {
                const defaultOnSubmitSuccess = () => {
                    showSuccess(snackbarLabel, snackbarLabelVariables);
                    helpers.setSubmitting(false);

                    hideLoader();
                };

                if (onSubmitSuccess) {
                    onSubmitSuccess(defaultOnSubmitSuccess, helpers, response);
                    return;
                }

                defaultOnSubmitSuccess();
            })
            // According to https://github.com/axios/axios/issues/3612
            // This should be typed as Error | AxiosError
            // Leaving this as it is to avoid further changes. Revisit when this will cause problems
            .catch((error: AxiosError) => {
                const defaultOnSubmitCatch = () => {
                    handleCatch(error, helpers);
                    hideLoader();
                };

                if (typeof onSubmitCatch !== "undefined") {
                    onSubmitCatch(defaultOnSubmitCatch, helpers, error);
                    return;
                }

                defaultOnSubmitCatch();
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
