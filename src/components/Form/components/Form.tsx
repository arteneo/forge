import React from "react";
import FormContent, { FormContentProps } from "../../../components/Form/components/FormContent";
import { FormProvider, FormProviderProps } from "../../../components/Form/contexts/Form";

type FormProps = FormContentProps & Omit<FormProviderProps, "children">;

const Form = ({
    children,
    endpoint,
    fields,
    initialValues,
    initializeEndpoint,
    processInitialValues,
    translateLabelPrefix,
    changeSubmitValues,
    onSubmitSuccess,
    onSubmit,
    formikProps,
}: FormProps) => {
    return (
        <FormProvider {...{ fields, initialValues, initializeEndpoint, processInitialValues, translateLabelPrefix }}>
            <FormContent {...{ onSubmit, changeSubmitValues, onSubmitSuccess, endpoint, formikProps }}>
                {children}
            </FormContent>
        </FormProvider>
    );
};

export default Form;
export { FormProps };
