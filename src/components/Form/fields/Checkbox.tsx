import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import CheckboxElement, { CheckboxElementSpecificProps } from "@arteneo/forge/components/Form/elements/CheckboxElement";
import TextFieldInterface from "@arteneo/forge/components/Form/definitions/TextFieldInterface";

type CheckboxProps = CheckboxElementSpecificProps & TextFieldInterface;

const Checkbox = ({
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
}: CheckboxProps) => {
    if (typeof name === "undefined") {
        throw new Error("Email component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, setValidationSchema, getError, getLabel, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);

    const updateValidationSchema = () => {
        if (resolvedHidden) {
            setValidationSchema(resolvedPath, null);
            return;
        }

        if (!validationSchema && resolvedRequired) {
            setValidationSchema(resolvedPath, Yup.boolean().oneOf([true], "validation.required"));
            return;
        }

        if (!validationSchema) {
            setValidationSchema(resolvedPath, Yup.boolean());
            return;
        }

        if (resolvedRequired) {
            setValidationSchema(resolvedPath, validationSchema.oneOf([true], "validation.required"));
            return;
        }
    };

    if (resolvedHidden || !isReady(resolvedPath)) {
        return null;
    }

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(resolvedPath, touched, errors, submitCount);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);

    return (
        <CheckboxElement
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

export default Checkbox;
export { CheckboxProps };
