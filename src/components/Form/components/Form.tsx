import React from "react";
import { FormikValues } from "formik";
import FormContent, { FormContentProps } from "../../../components/Form/components/FormContent";
import { FormProvider } from "../../../components/Form/contexts/Form";
import ValidationSchemaInterface from "../../../components/Form/definitions/ValidationSchemaInterface";

interface FormProps extends FormContentProps {
    initialValues?: FormikValues;
    initializeEndpoint?: string;
    isReady?: (formikValidationSchema: ValidationSchemaInterface, path: string) => boolean;
    translateLabelPrefix?: string;
}

const Form = ({
    fields,
    children,
    endpoint,
    initialValues,
    initializeEndpoint,
    translateLabelPrefix,
    changeSubmitValues,
    onSubmitSuccess,
    onSubmit,
    isReady,
    buttons,
    formikProps,
}: FormProps) => {
    if (!children && !fields) {
        throw new Error("Form component: children or fields prop is required.");
    }

    return (
        <FormProvider {...{ fields, isReady, initialValues, initializeEndpoint, translateLabelPrefix }}>
            aaa
            <FormContent {...{ fields, onSubmit, changeSubmitValues, onSubmitSuccess, endpoint, buttons, formikProps }}>
                {children}
            </FormContent>
        </FormProvider>
    );
};

export default Form;
export { FormProps };
