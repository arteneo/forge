import React from "react";
import FormMultiContent, { FormMultiContentProps } from "../../../components/Form/components/FormMultiContent";
import { FormProvider, FormProviderProps } from "../../../components/Form/contexts/Form";

type FormMultiProps = FormMultiContentProps & Omit<FormProviderProps, "children">;

const FormMulti = ({
    fields,
    initialValues,
    initializeEndpoint,
    processInitialValues,
    children,
    endpoints,
    onSubmitStart,
    onSubmitSuccess,
    onSubmitCatch,
    onSubmitFinish,
    changeSubmitValues,
    formikProps,
}: FormMultiProps) => {
    return (
        <FormProvider {...{ fields, initialValues, initializeEndpoint, processInitialValues }}>
            <FormMultiContent
                {...{
                    children,
                    endpoints,
                    onSubmitStart,
                    onSubmitSuccess,
                    onSubmitCatch,
                    onSubmitFinish,
                    changeSubmitValues,
                    formikProps,
                }}
            />
        </FormProvider>
    );
};

export default FormMulti;
export { FormMultiProps };
