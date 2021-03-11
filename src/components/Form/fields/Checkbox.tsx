import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import { resolveBooleanOrFunction, resolveUpdatedValidationSchema } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import CheckboxElement from "@arteneo/forge/components/Form/elements/CheckboxElement";
import { FormControlProps, FormControlLabelProps } from "@material-ui/core";
import TextFieldInterface from "@arteneo/forge/components/Form/definitions/TextFieldInterface";

interface CheckboxProps extends TextFieldInterface {
    onChange?: (
        name: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        checked: boolean,
        onChange: () => void,
        values: FormikValues
    ) => void;
    formControlLabelProps?: FormControlLabelProps;
    formControlProps?: FormControlProps;
}

const Checkbox = ({
    name,
    label,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    help,
    disableTranslateHelp = false,
    onChange,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema = Yup.boolean(),
    formControlLabelProps,
    formControlProps,
}: CheckboxProps) => {
    if (typeof name === "undefined") {
        throw new Error("Email component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, setValidationSchema, getError, getLabel, getHelp } = useForm();
    const { values, touched, errors }: FormikProps<FormikValues> = useFormikContext();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);

    React.useEffect(
        () =>
            setValidationSchema(
                name,
                resolveUpdatedValidationSchema(validationSchema, resolvedHidden, resolvedRequired)
            ),
        [resolvedRequired, resolvedHidden]
    );

    if (resolvedHidden || !isReady(name)) {
        return null;
    }

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(name, touched, errors);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);

    return (
        <CheckboxElement
            {...{
                name,
                label: resolvedLabel,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                onChange,
                formControlLabelProps,
                formControlProps,
            }}
        />
    );
};

export default Checkbox;
export { CheckboxProps };
