import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import RadioElement, { RadioElementSpecificProps } from "@arteneo/forge/components/Form/elements/RadioElement";
import TextFieldInterface from "@arteneo/forge/components/Form/definitions/TextFieldInterface";

type RadioProps = RadioElementSpecificProps & TextFieldInterface;

const Radio = ({
    name,
    path,
    label,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    help,
    disableTranslateHelp = false,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema,
    ...elementSpecificProps
}: RadioProps) => {
    if (typeof name === "undefined") {
        throw new Error("Radio component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, resolveValidationSchema, getError, getLabel, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);

    const updateValidationSchema = () => {
        let defaultValidationSchema = Yup.string();

        if (resolvedRequired) {
            defaultValidationSchema = defaultValidationSchema.required("validation.required");
        }

        resolveValidationSchema(
            resolvedPath,
            validationSchema,
            defaultValidationSchema,
            resolvedHidden,
            resolvedRequired,
            values,
            touched,
            errors,
            name
        );
    };

    if (resolvedHidden || !isReady(resolvedPath)) {
        return null;
    }

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(resolvedPath, touched, errors, submitCount);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);

    return (
        <RadioElement
            {...{
                name,
                path: resolvedPath,
                label: resolvedLabel,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                ...elementSpecificProps,
            }}
        />
    );
};

export default Radio;
export { RadioProps };
