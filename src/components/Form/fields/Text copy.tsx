import React from "react";
import { useForm } from "../../../components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import TextElement, { TextElementSpecificProps } from "../../../components/Form/elements/TextElement";
import TextFieldPlaceholderInterface from "../../../components/Form/definitions/TextFieldPlaceholderInterface";

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
    ...elementSpecificProps
}: TextProps) => {
    if (typeof name === "undefined") {
        throw new Error("Text component: name is required prop. By default it is injected by FormContent.");
    }

    const { getError, getLabel, getPlaceholder, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();

    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    if (resolvedHidden) {
        return null;
    }

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedPath = path ? path : name;
    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(resolvedPath, touched, errors, submitCount);
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
