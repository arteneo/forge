import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { KeyboardDateTimePicker, KeyboardDateTimePickerProps } from "@material-ui/pickers";
import { formatRFC3339, isValid } from "date-fns";

interface DateTimeElementProps {
    name: string;
    label?: React.ReactNode;
    placeholder?: string;
    error?: string;
    help?: React.ReactNode;
    onChange?: (
        name: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        // eslint-disable-next-line
        date: any,
        onChange: () => void,
        values: FormikValues,
        value?: string | null
    ) => void;
    required: boolean;
    disabled: boolean;
    fieldProps?: KeyboardDateTimePickerProps;
}

const DateTimeElement = ({
    name,
    label,
    placeholder,
    error,
    help,
    required,
    disabled,
    onChange,
    fieldProps,
}: DateTimeElementProps) => {
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    // eslint-disable-next-line
    const defaultOnChange = (date: any, value?: string | null) => {
        if (isValid(date)) {
            setFieldValue(name, formatRFC3339(date));
            return;
        }

        setFieldValue(name, null);
    };

    // eslint-disable-next-line
    const callableOnChange = (date: any, value?: string | null) => {
        if (onChange) {
            // Parameters are swapped for convenience
            onChange(name, setFieldValue, date, () => defaultOnChange(date, value), values, value);
            return;
        }

        defaultOnChange(date, value);
    };

    const hasError = error ? true : false;
    const internalFieldProps: KeyboardDateTimePickerProps = {
        value: getIn(values, name, null),
        onChange: callableOnChange,
        error: hasError,
        label,
        placeholder,
        required,
        disabled,
        ampm: false,
        disableToolbar: true,
        autoOk: true,
        fullWidth: true,
        variant: "inline",
        margin: "normal",
        helperText: undefined,
    };

    if (hasError || help) {
        internalFieldProps.helperText = (
            <>
                {error}
                {hasError && <br />}
                {help}
            </>
        );
    }

    const mergedFieldProps = Object.assign(internalFieldProps, fieldProps);

    return <KeyboardDateTimePicker {...mergedFieldProps} />;
};

export default DateTimeElement;
export { DateTimeElementProps };
