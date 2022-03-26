import React from "react";
import * as Yup from "yup";
import { useForm } from "../../../components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import SelectElement, { SelectElementSpecificProps } from "../../../components/Form/elements/SelectElement";
import TextFieldPlaceholderInterface from "../../../components/Form/definitions/TextFieldPlaceholderInterface";

type SelectProps = SelectElementSpecificProps & TextFieldPlaceholderInterface;

const Select = ({
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
}: SelectProps) => {
    if (typeof name === "undefined") {
        throw new Error("Select component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, resolveValidationSchema, getError, getLabel, getPlaceholder, getHelp } = useForm();
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
        <SelectElement
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

export default Select;
export { SelectProps };
