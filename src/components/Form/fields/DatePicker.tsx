import React from "react";
import * as Yup from "yup";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from "@mui/x-date-pickers";
import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import { useUtils } from "@mui/x-date-pickers/internals/hooks/useUtils";
import { parseISO, formatRFC3339, isValid } from "date-fns";
import _ from "lodash";
import FieldPlaceholderInterface from "../../../components/Form/definitions/FieldPlaceholderInterface";
import { useForm } from "../../../components/Form/contexts/Form";

type DatePickerOnChangeValue = string;
type DatePickerValue = null | Date;
// eslint-disable-next-line
type DatePickerError = any;

type DatePickerFieldProps = MuiDatePickerProps<DatePickerValue>;

interface DatePickerSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: DatePickerOnChangeValue,
        onChange: () => void,
        values: FormikValues,
        name: string,
        context: FieldChangeHandlerContext<DatePickerError>
    ) => void;
    fieldProps?: Partial<DatePickerFieldProps>;
}

type DatePickerProps = DatePickerSpecificProps & FieldPlaceholderInterface;

const DatePicker = ({
    onChange,
    fieldProps,
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        if (required && !Yup.string().required().isValidSync(value)) {
            return "validation.required";
        }

        return undefined;
    },
    ...field
}: DatePickerProps) => {
    const utils = useUtils();
    const {
        values,
        touched,
        errors,
        submitCount,
        setFieldValue,
        setFieldTouched,
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

        registerField(path, {
            validate: () => validate,
        });

        return () => {
            unregisterField(path);
        };
    }, [hidden, registerField, unregisterField, path, validate]);

    if (hidden) {
        return null;
    }

    const defaultOnChange = (value: DatePickerOnChangeValue) => {
        setFieldValue(path, value);
    };

    const callableOnChange = (value: DatePickerValue, context: FieldChangeHandlerContext<DatePickerError>) => {
        const onChangeValue = value !== null && isValid(value) ? formatRFC3339(value) : "";

        if (onChange) {
            // Parameters are swapped for convenience
            onChange(path, setFieldValue, onChangeValue, () => defaultOnChange(onChangeValue), values, name, context);
            return;
        }

        defaultOnChange(onChangeValue);
    };

    const format = utils.formats.fullDate;
    const value = getIn(values, path, "");
    const parsedValue = parseISO(value);
    const fieldValue = isValid(parsedValue) ? parsedValue : null;

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

    const internalFieldProps: DatePickerFieldProps = {
        value: fieldValue,
        onChange: callableOnChange,
        // onError is used to revalidate after selecting correct value (from picker) when value has been invalid previosly
        // This is kind of missing part of onBlur (onBlur should also be fired when selecting a value from picker)
        onError: () => setFieldTouched(path, true),
        label,
        disabled,
        format,
        slotProps: {
            textField: {
                label,
                required,
                placeholder,
                helperText,
                onBlur: () => setFieldTouched(path, true),
                error: hasError,
            },
        },
    };

    const mergedFieldProps = _.merge(internalFieldProps, fieldProps);

    return <MuiDatePicker {...mergedFieldProps} />;
};

export default DatePicker;
export {
    DatePickerProps,
    DatePickerSpecificProps,
    DatePickerFieldProps,
    DatePickerOnChangeValue,
    DatePickerValue,
    DatePickerError,
};
