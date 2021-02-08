import React from "react";
import { useForm } from "forge-react/components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useHandleCatch } from "forge-react/contexts/HandleCatch";
import { Formik, FormikHelpers, FormikValues, Form } from "formik";
import * as Yup from "yup";
import { resolveStringOrFunction } from "forge-react/utils/resolve";
import FormButtons from "forge-react/components/Form/components/FormButtons";
import PromptIfDirty from "forge-react/components/Form/components/PromptIfDirty";
import { useSnackbar } from "forge-react/contexts/Snackbar";
import { useLoader } from "forge-react/contexts/Loader";
import FieldsInterface from "forge-react/components/Form/definitions/FieldsInterface";
import { makeStyles } from "@material-ui/core";
import ValidationSchemaInterface from "forge-react/components/Form/definitions/ValidationSchemaInterface";

interface Props {
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
    // eslint-disable-next-line
    validationSchema?: any;
    disablePromptIfDirty?: boolean;
    promptIfDirtyLabel?: string;
}

const useStyles = makeStyles(() => ({
    form: {
        width: "100%",
    },
}));

const FormContent: React.FC<Props> = ({
    fields,
    children,
    buttons,
    changeSubmitValues,
    onSubmitSuccess,
    endpoint,
    onSubmit,
    validationSchema,
    disablePromptIfDirty,
    promptIfDirtyLabel,
}: Props) => {
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

    const getValidationSchema = () => {
        const validationSchema: ValidationSchemaInterface = {};

        Object.keys(formikValidationSchema).forEach((field) => {
            const fieldValidationSchema = formikValidationSchema[field];

            if (Array.isArray(fieldValidationSchema) && fieldValidationSchema.length > 0) {
                // eslint-disable-next-line
                const fieldValidationSchemaShape: any[] = fieldValidationSchema[0];
                validationSchema[field] = Yup.array().of(Yup.object().shape(fieldValidationSchemaShape));
                return;
            }

            validationSchema[field] = fieldValidationSchema;
        });

        return Yup.object().shape(validationSchema);
    };

    const _onSubmit = onSubmit
        ? (values: FormikValues, helpers: FormikHelpers<FormikValues>) => onSubmit(values, helpers, setObject)
        : defaultOnSubmit;

    return (
        <Formik
            initialValues={formikInitialValues}
            validationSchema={getValidationSchema()}
            onSubmit={_onSubmit}
            enableReinitialize
        >
            <Form className={classes.form}>
                {!disablePromptIfDirty && <PromptIfDirty label={promptIfDirtyLabel} />}

                {children && children}
                {!children &&
                    fields &&
                    Object.keys(fields).map((field) => (
                        <React.Fragment key={field}>
                            {React.cloneElement(fields[field], {
                                validationSchema: validationSchema?.[field],
                                name: fields[field].props.name || field,
                            })}
                        </React.Fragment>
                    ))}
                {buttons}
            </Form>
        </Formik>
    );
};

FormContent.defaultProps = {
    buttons: <FormButtons />,
};

export default FormContent;
export { Props };
