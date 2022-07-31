import React from "react";
import FormContent, { FormContentProps } from "../../../components/Form/components/FormContent";
import { FormProvider, FormProviderProps } from "../../../components/Form/contexts/Form";

type FormProps = FormContentProps & Omit<FormProviderProps, "children">;

const Form = ({
    fields,
    initialValues,
    initializeEndpoint,
    processInitialValues,
    children,
    endpoint,
    onSubmit,
    onSubmitSuccess,
    changeSubmitValues,
    snackbarLabel,
    snackbarLabelVariables,
    formikProps,
}: FormProps) => {
    return (
        <FormProvider {...{ fields, initialValues, initializeEndpoint, processInitialValues }}>
            <FormContent
                {...{
                    children,
                    endpoint,
                    onSubmit,
                    onSubmitSuccess,
                    changeSubmitValues,
                    snackbarLabel,
                    snackbarLabelVariables,
                    formikProps,
                }}
            />
        </FormProvider>
    );
};

export default Form;
export { FormProps };
