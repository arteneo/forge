import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { TimePicker as MuiTimePicker, TimePickerProps as MuiTimePickerProps } from "@mui/lab";
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { formatRFC3339, isValid } from "date-fns";
import FieldPlaceholderInterface from "../../../components/Form/definitions/FieldPlaceholderInterface";
import { useForm } from "../../../components/Form/contexts/Form";

interface TimePickerSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        // eslint-disable-next-line
        date: any,
        onChange: () => void,
        values: FormikValues,
        name: string,
        value?: string | null
    ) => void;
    fieldProps?: Partial<MuiTimePickerProps>;
}

type TimePickerProps = TimePickerSpecificProps & FieldPlaceholderInterface;

const TimePickerRenderInput = (props: MuiTextFieldProps) => <MuiTextField {...props} />;

const TimePicker = ({ onChange, fieldProps, ...field }: TimePickerProps) => {
    const {
        values,
        touched,
        errors,
        submitCount,
        setFieldValue,
        registerField,
        unregisterField,
    }: FormikProps<FormikValues> = useFormikContext();
    const { resolvePlaceholderField } = useForm();
    const { name, path, label, error, hasError, help, required, disabled, hidden, validate, placeholder } =
        resolvePlaceholderField({
            values,
            touched,
            errors,
            submitCount,
            ...field,
        });

    React.useEffect(() => {
        if (hidden || typeof validate === "undefined") {
            return;
        }

        registerField(name, {
            validate: () => validate,
        });

        return () => {
            unregisterField(name);
        };
    }, [hidden, registerField, unregisterField, name, validate]);

    if (hidden) {
        return null;
    }

    // eslint-disable-next-line
    const defaultOnChange = (date: any) => {
        if (isValid(date)) {
            setFieldValue(path, formatRFC3339(date));
            return;
        }

        setFieldValue(path, null);
    };

    // eslint-disable-next-line
    const callableOnChange = (date: any, value?: string | null) => {
        if (onChange) {
            // Parameters are swapped for convenience
            onChange(path, setFieldValue, date, () => defaultOnChange(date), values, name, value);
            return;
        }

        defaultOnChange(date);
    };

    const renderInput = (props: MuiTextFieldProps) => {
        let helperText: undefined | React.ReactNode = undefined;

        if (hasError || help) {
            helperText = (
                <>
                    {error}
                    {hasError && <br />}
                    {help}
                </>
            );
        }

        return <TimePickerRenderInput {...{ label, required, placeholder, error: hasError, helperText, ...props }} />;
    };

    const internalFieldProps: MuiTimePickerProps = {
        value: getIn(values, path, null),
        onChange: callableOnChange,
        label,
        disabled,
        ampm: false,
        renderInput,
    };

    const mergedFieldProps = Object.assign(internalFieldProps, fieldProps);

    return <MuiTimePicker {...mergedFieldProps} />;
};

export default TimePicker;
export { TimePickerProps, TimePickerSpecificProps };
