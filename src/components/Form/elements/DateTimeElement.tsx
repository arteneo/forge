import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { KeyboardDateTimePicker, KeyboardDateTimePickerProps } from "@material-ui/pickers";
import { formatRFC3339, isValid } from "date-fns";
import FieldElementPlaceholderInterface from "@arteneo/forge/components/Form/definitions/FieldElementPlaceholderInterface";

interface DateTimeElementSpecificProps {
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
    fieldProps?: KeyboardDateTimePickerProps;
}

type DateTimeElementProps = DateTimeElementSpecificProps & FieldElementPlaceholderInterface;

const DateTimeElement = ({
    name,
    path,
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
            setFieldValue(path, formatRFC3339(date));
            return;
        }

        setFieldValue(path, null);
    };

    // eslint-disable-next-line
    const callableOnChange = (date: any, value?: string | null) => {
        if (onChange) {
            // Parameters are swapped for convenience
            onChange(path, setFieldValue, date, () => defaultOnChange(date, value), values, name, value);
            return;
        }

        defaultOnChange(date, value);
    };

    const hasError = error ? true : false;
    const internalFieldProps: KeyboardDateTimePickerProps = {
        value: getIn(values, path, null),
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
export { DateTimeElementProps, DateTimeElementSpecificProps };
