import React from "react";
import { FormikValues } from "formik";
import FormContent, { FormContentProps } from "../../../components/Form/components/FormContent";
import { FormProvider } from "../../../components/Form/contexts/Form";

// TODO Maybye use FormProvider props?
interface FormProps extends FormContentProps {
    initialValues?: FormikValues;
    initializeEndpoint?: string;
    translateLabelPrefix?: string;
}

const Form = ({
    children,
    endpoint,
    initialValues,
    initializeEndpoint,
    translateLabelPrefix,
    changeSubmitValues,
    onSubmitSuccess,
    onSubmit,
    formikProps,
}: FormProps) => {
    return (
        <FormProvider {...{ initialValues, initializeEndpoint, translateLabelPrefix }}>
            <FormContent {...{ onSubmit, changeSubmitValues, onSubmitSuccess, endpoint, formikProps }}>
                {children}
            </FormContent>
        </FormProvider>
    );
};

export default Form;
export { FormProps };
