import React from "react";
import { useForm } from "../../../components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useHandleCatch } from "../../../contexts/HandleCatch";
import { Formik, FormikHelpers, FormikValues, Form, FormikConfig } from "formik";
import { resolveStringOrFunction } from "../../../utils/resolve";
import FormButtons from "../../../components/Form/components/FormButtons";
import { useSnackbar } from "../../../contexts/Snackbar";
import { useLoader } from "../../../contexts/Loader";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";
import { makeStyles } from "@mui/styles";
import FormContentFields from "../../../components/Form/components/FormContentFields";
import { Optional } from "../../../utils/TypescriptOperators";

interface FormContentProps {
    fields?: FieldsInterface;
    children?: React.ReactNode;
    buttons?: React.ReactNode;
    changeSubmitValues?: (values: FormikValues) => FormikValues;
    onSubmitSuccess?: (
        defaultOnSubmitSuccess: () => void,
        // eslint-disable-next-line
        submitAction: any,
        helpers: FormikHelpers<FormikValues>,
        response: AxiosResponse,
        // eslint-disable-next-line
        setObject: (object: any) => void
    ) => void;
    onSubmit?: (
        values: FormikValues,
        helpers: FormikHelpers<FormikValues>,
        // eslint-disable-next-line
        setObject: (object: any) => void
    ) => void;
    endpoint?: string | ((values: FormikValues) => string);
    formikProps?: Optional<Optional<FormikConfig<FormikValues>, "initialValues">, "onSubmit">;
}

const useStyles = makeStyles(() => ({
    form: {
        width: "100%",
    },
}));

const FormContent = ({
    fields,
    children,
    buttons = <FormButtons />,
    changeSubmitValues,
    onSubmitSuccess,
    endpoint,
    onSubmit,
    formikProps,
}: FormContentProps) => {
    const classes = useStyles();
    const { formikInitialValues, formikValidationSchema, setObject, submitAction } = useForm();
    const handleCatch = useHandleCatch();
    const { showSuccess } = useSnackbar();
    const { showLoader, hideLoader } = useLoader();

    if (!children && !fields) {
        throw new Error("FormContent component: children or fields prop is required.");
    }

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
                    setObject(response.data);

                    showSuccess("snackbar.form.submitted");
                    helpers.setSubmitting(false);

                    hideLoader();
                };

                if (onSubmitSuccess) {
                    onSubmitSuccess(defaultOnSubmitSuccess, submitAction, helpers, response, setObject);
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
        ? (values: FormikValues, helpers: FormikHelpers<FormikValues>) => onSubmit(values, helpers, setObject)
        : defaultOnSubmit;

    return (
        <Formik
            initialValues={formikInitialValues}
            validationSchema={formikValidationSchema}
            onSubmit={_onSubmit}
            enableReinitialize
            {...formikProps}
        >
            <Form className={classes.form}>
                {children && children}
                {!children && fields && <FormContentFields {...{ fields }} />}
                {buttons}
            </Form>
        </Formik>
    );
};

export default FormContent;
export { FormContentProps };
