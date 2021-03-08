import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import TextElement, { TextElementSpecificProps } from "@arteneo/forge/components/Form/elements/TextElement";
import TextFieldPlaceholderInterface from "@arteneo/forge/components/Form/definitions/TextFieldPlaceholderInterface";

type TextProps = TextElementSpecificProps & TextFieldPlaceholderInterface;

const Text = ({
    name,
    path,
    label,
    placeholder,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    enableAutoPlaceholder = false,
    disableTranslatePlaceholder = false,
    help,
    disableTranslateHelp = false,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema,
    ...elementSpecificProps
}: TextProps) => {
    if (typeof name === "undefined") {
        throw new Error("Text component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, setValidationSchema, getError, getLabel, getPlaceholder, getHelp } = useForm();
    const { values, touched, errors }: FormikProps<FormikValues> = useFormikContext();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);

    const updateValidationSchema = () => {
        if (resolvedHidden) {
            setValidationSchema(name, null);
            return;
        }

        if (!validationSchema && resolvedRequired) {
            setValidationSchema(name, Yup.string().required("validation.required"));
            return;
        }

        if (!validationSchema) {
            return;
        }

        if (resolvedRequired) {
            setValidationSchema(name, validationSchema.required("validation.required"));
            return;
        }
    };

    if (resolvedHidden || !isReady(name)) {
        return null;
    }

    const resolvedPath = path ? path : name;
    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(resolvedPath, touched, errors);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);
    const resolvedPlaceholder = getPlaceholder(
        placeholder,
        values,
        touched,
        errors,
        name,
        enableAutoPlaceholder,
        disableTranslatePlaceholder
    );

    return (
        <TextElement
            {...{
                name,
                path: resolvedPath,
                label: resolvedLabel,
                placeholder: resolvedPlaceholder,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                ...elementSpecificProps,
            }}
        />
    );
};

export default Text;
export { TextProps };
