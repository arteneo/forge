import React from "react";
import * as Yup from "yup";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { TimePicker as MuiTimePicker, TimePickerProps as MuiTimePickerProps } from "@mui/x-date-pickers";
import { useUtils } from "@mui/x-date-pickers/internals/hooks/useUtils";
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

const TimePicker = ({
    onChange,
    fieldProps,
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        if (required && !Yup.string().required().isValidSync(value)) {
            return "validate.required";
        }

        return undefined;
    },
    ...field
}: TimePickerProps) => {
    const utils = useUtils();
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
            validate: fieldValidate,
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

        setFieldValue(path, date);
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

        return (
            <TimePickerRenderInput
                {...{ label, required, placeholder, helperText, ...props, error: props.error || hasError }}
            />
        );
    };

    const format = utils.formats.fullTime24h;
    const value = getIn(values, path, "");
    const internalFieldProps: MuiTimePickerProps = {
        value: value ? value : null,
        onChange: callableOnChange,
        label,
        disabled,
        ampm: false,
        renderInput,
        inputFormat: format,
        mask: utils.getFormatHelperText(format).replace(/[a-zA-Z]/g, "_"),
    };

    const mergedFieldProps = Object.assign(internalFieldProps, fieldProps);

    return <MuiTimePicker {...mergedFieldProps} />;
};

export default TimePicker;
export { TimePickerProps, TimePickerSpecificProps };
