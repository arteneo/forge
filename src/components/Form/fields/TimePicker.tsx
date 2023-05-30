import React from "react";
import * as Yup from "yup";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { TimePicker as MuiTimePicker, TimePickerProps as MuiTimePickerProps } from "@mui/x-date-pickers";
import { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import { useUtils } from "@mui/x-date-pickers/internals/hooks/useUtils";
// TODO
// import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { formatRFC3339, isValid } from "date-fns";
import FieldPlaceholderInterface from "../../../components/Form/definitions/FieldPlaceholderInterface";
import { useForm } from "../../../components/Form/contexts/Form";

// TODO
type TimePickerValue = null | string;
// eslint-disable-next-line
type TimePickerError = any;

type TimePickerFieldProps = MuiTimePickerProps<TimePickerValue>;

interface TimePickerSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: TimePickerValue,
        onChange: () => void,
        values: FormikValues,
        name: string,
        context: FieldChangeHandlerContext<TimePickerError>
    ) => void;
    fieldProps?: Partial<TimePickerFieldProps>;
}

type TimePickerProps = TimePickerSpecificProps & FieldPlaceholderInterface;

// TODO
// const TimePickerRenderInput = (props: MuiTextFieldProps) => <MuiTextField {...props} />;

const TimePicker = ({
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
}: TimePickerProps) => {
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
    const { name, path, label, disabled, hidden, validate } = resolvePlaceholderField({
        values,
        touched,
        errors,
        submitCount,
        validate: fieldValidate,
        ...field,
    });
    // TODO
    // const { name, path, label, error, hasError, help, required, disabled, hidden, validate, placeholder } =
    //     resolvePlaceholderField({
    //         values,
    //         touched,
    //         errors,
    //         submitCount,
    //         validate: fieldValidate,
    //         ...field,
    //     });

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

    const defaultOnChange = (value: TimePickerValue) => {
        if (isValid(value)) {
            // TODO TS
            setFieldValue(path, formatRFC3339(value as unknown as number));
            return;
        }

        setFieldValue(path, value);
    };

    const callableOnChange = (value: TimePickerValue, context: FieldChangeHandlerContext<TimePickerError>) => {
        if (onChange) {
            // Parameters are swapped for convenience
            onChange(path, setFieldValue, value, () => defaultOnChange(value), values, name, context);
            return;
        }

        defaultOnChange(value);
    };

    // TODO
    // const renderInput = (props: MuiTextFieldProps) => {
    //     let helperText: undefined | React.ReactNode = undefined;

    //     if (hasError || help) {
    //         helperText = (
    //             <>
    //                 {error}
    //                 {hasError && <br />}
    //                 {help}
    //             </>
    //         );
    //     }

    //     return (
    //         <TimePickerRenderInput
    //             {...{
    //                 label,
    //                 required,
    //                 placeholder,
    //                 helperText,
    //                 onBlur: () => setFieldTouched(path, true),
    //                 ...props,
    //                 error: props.error || hasError,
    //             }}
    //         />
    //     );
    // };

    const format = utils.formats.fullTime24h;
    const value = getIn(values, path, "");
    const internalFieldProps: TimePickerFieldProps = {
        value: value ? value : null,
        onChange: callableOnChange,
        // onError is used to revalidate after selecting correct value (from picker) when value has been invalid previosly
        // This is kind of missing part of onBlur (onBlur should also be fired when selecting a value from picker)
        onError: () => setFieldTouched(path, true),
        label,
        disabled,
        ampm: false,
        // TODO
        // renderInput,
        format,
        // TODO
        // mask: utils.getFormatHelperText(format).replace(/[a-zA-Z]/g, "_"),
    };

    const mergedFieldProps = Object.assign(internalFieldProps, fieldProps);

    return <MuiTimePicker {...mergedFieldProps} />;
};

export default TimePicker;
export { TimePickerProps, TimePickerSpecificProps, TimePickerFieldProps };
