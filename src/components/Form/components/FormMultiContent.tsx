import React from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { Formik, FormikHelpers, FormikValues, Form, FormikConfig } from "formik";
import { AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";
import { useForm } from "../../../components/Form/contexts/Form";
import { useHandleCatch } from "../../../contexts/HandleCatch";
import { resolveFieldEndpoint } from "../../../utilities/resolve";
import Optional from "../../../definitions/Optional";
import FieldEndpointType from "../../../components/Form/definitions/FieldEndpointType";

interface FormMultiContentProps {
    children: React.ReactNode;
    changeSubmitValues?: (values: FormikValues) => FormikValues;
    onSubmitStart?: (
        defaultOnSubmitStart: () => void,
        values: FormikValues,
        helpers: FormikHelpers<FormikValues>
    ) => void;
    onSubmitSuccess?: (
        defaultOnSubmitSuccess: () => void,
        response: AxiosResponse,
        values: FormikValues,
        helpers: FormikHelpers<FormikValues>,
        key: number
    ) => void;
    onSubmitCatch?: (
        defaultOnSubmitCatch: () => void,
        error: AxiosError,
        values: FormikValues,
        helpers: FormikHelpers<FormikValues>,
        key: number,
        cancelled: boolean
    ) => void;
    onSubmitFinish?: (
        defaultOnSubmitFinish: () => void,
        values: FormikValues,
        helpers: FormikHelpers<FormikValues>,
        cancelled: boolean
    ) => void;
    endpoints: FieldEndpointType[];
    formikProps?: Optional<Optional<FormikConfig<FormikValues>, "initialValues">, "onSubmit">;
}

let axiosSource: null | CancelTokenSource = null;
let cancelled = false;

const FormMultiContent = ({
    children,
    endpoints,
    onSubmitStart = () => {
        return;
    },
    onSubmitSuccess = () => {
        return;
    },
    onSubmitCatch,
    onSubmitFinish = () => {
        return;
    },
    changeSubmitValues,
    formikProps,
}: FormMultiContentProps) => {
    const { formikInitialValues } = useForm();
    const handleCatch = useHandleCatch();

    React.useEffect(() => {
        cancelled = false;
        return () => axiosSource?.cancel(AXIOS_CANCELLED_UNMOUNTED);
    }, []);

    const resolveRequestConfigs = async (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
        const requestConfigs = endpoints
            .map((endpoint) => resolveFieldEndpoint(endpoint, values))
            .filter((requestConfig) => typeof requestConfig !== "undefined") as AxiosRequestConfig[];

        for (const [key, requestConfig] of requestConfigs.entries()) {
            if (cancelled) {
                return;
            }

            axiosSource = axios.CancelToken.source();
            requestConfig.cancelToken = axiosSource.token;
            requestConfig.method = requestConfig.method ?? "post";
            requestConfig.data = requestConfig.data ?? (changeSubmitValues ? changeSubmitValues(values) : values);

            await axios
                .request(requestConfig)
                .then((response: AxiosResponse) => {
                    onSubmitSuccess(
                        // Empty function by design to allow easier overrides
                        () => {
                            return;
                        },
                        response,
                        values,
                        helpers,
                        key
                    );
                })
                // According to https://github.com/axios/axios/issues/3612
                // This should be typed as Error | AxiosError
                // Leaving this as it is to avoid further changes. Revisit when this will cause problems
                .catch((error: AxiosError) => {
                    const defaultOnSubmitCatch = () => {
                        // By default we are not mapping any errors to Formik
                        handleCatch(error);

                        if (error?.message === AXIOS_CANCELLED_UNMOUNTED) {
                            cancelled = true;
                        }
                    };

                    if (typeof onSubmitCatch !== "undefined") {
                        onSubmitCatch(
                            defaultOnSubmitCatch,
                            error,
                            values,
                            helpers,
                            key,
                            error?.message === AXIOS_CANCELLED_UNMOUNTED
                        );
                        return;
                    }

                    defaultOnSubmitCatch();
                });
        }
    };

    const onSubmit = async (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
        onSubmitStart(
            // Empty function by design to allow easier overrides
            () => {
                return;
            },
            values,
            helpers
        );

        await resolveRequestConfigs(values, helpers);

        onSubmitFinish(
            // Empty function by design to allow easier overrides
            () => {
                return;
            },
            values,
            helpers,
            cancelled
        );
    };
    return (
        <Formik initialValues={formikInitialValues} onSubmit={onSubmit} enableReinitialize {...formikProps}>
            <Form>{children}</Form>
        </Formik>
    );
};

export default FormMultiContent;
export { FormMultiContentProps };
