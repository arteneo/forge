import React from "react";
import { FormikValues } from "formik";
import FormContent, { FormContentProps } from "@arteneo/forge/components/Form/components/FormContent";
import { FormProvider } from "@arteneo/forge/components/Form/contexts/Form";

interface FormProps extends FormContentProps {
    initialValues?: FormikValues;
    initializeEndpoint?: string;
    isReady?: (path: string) => boolean;
}

const Form = ({
    fields,
    children,
    endpoint,
    initialValues,
    initializeEndpoint,
    validationSchema,
    changeSubmitValues,
    onSubmitSuccess,
    onSubmit,
    isReady,
    buttons,
}: FormProps) => {
    if (!children && !fields) {
        throw new Error("Form component: children or fields prop is required.");
    }

    return (
        <FormProvider {...{ fields, isReady, initialValues, initializeEndpoint }}>
            <FormContent
                {...{ fields, onSubmit, changeSubmitValues, onSubmitSuccess, endpoint, buttons, validationSchema }}
            >
                {children}
            </FormContent>
        </FormProvider>
    );
};

export default Form;
export { FormProps };
