import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import DateElement from "@arteneo/forge/components/Form/elements/DateElement";
import TextFieldInterface from "@arteneo/forge/components/Form/definitions/TextFieldInterface";
import { KeyboardDatePickerProps } from "@material-ui/pickers";

interface DateProps extends TextFieldInterface {
    onChange?: (
        name: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: () => void,
        values: FormikValues
    ) => void;
    fieldProps?: KeyboardDatePickerProps;
}

const Date = ({
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
    validationSchema,
    placeholder = "",
    fieldProps,
}: DateProps) => {
    if (typeof name === "undefined") {
        throw new Error("Text component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, setValidationSchema, getError, getLabel, getHelp } = useForm();
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

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(name, touched, errors);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);

    return (
        <DateElement
            {...{
                name,
                label: resolvedLabel,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                onChange,
                placeholder,
                fieldProps,
            }}
        />
    );
};

export default Date;
export { DateProps };
