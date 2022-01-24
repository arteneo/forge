import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { TimePicker, TimePickerProps } from "@mui/lab";
import { formatRFC3339, isValid } from "date-fns";
import FieldElementPlaceholderInterface from "@arteneo/forge/components/Form/definitions/FieldElementPlaceholderInterface";
import { TextField } from "@mui/material";

interface TimeElementSpecificProps {
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
    fieldProps?: Partial<TimePickerProps>;
}

type TimeElementProps = TimeElementSpecificProps & FieldElementPlaceholderInterface;

const TimeElement = ({
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
}: TimeElementProps) => {
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    // eslint-disable-next-line
    const defaultOnChange = (date: any, value?: string | null) => {
        console.log("🚀 ~ file: TimeElement.tsx ~ line 40 ~ defaultOnChange ~ date", date);
        if (isValid(date)) {
            console.log(
                "🚀 ~ file: TimeElement.tsx ~ line 43 ~ defaultOnChange ~ formatRFC3339(date)",
                formatRFC3339(date)
            );
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

    const internalFieldProps: TimePickerProps = {
        value: getIn(values, path, null),
        onChange: callableOnChange,
        label,
        disabled,
        ampm: false,
        renderInput: (params) => (
            <TextField
                {...{
                    ...params,
                    helperText,
                    placeholder,
                    required,
                    fullWidth: true,
                    margin: "normal",
                    error: hasError,
                }}
            />
        ),
    };

    const mergedFieldProps = Object.assign(internalFieldProps, fieldProps);

    return <TimePicker {...mergedFieldProps} />;
};

export default TimeElement;
export { TimeElementProps, TimeElementSpecificProps };
