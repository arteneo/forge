import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { TextField as MuiTextField, TextFieldProps } from "@material-ui/core";

interface TextElementProps {
    name: string;
    label?: React.ReactNode;
    error?: string;
    help?: React.ReactNode;
    onChange?: (
        name: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: () => void,
        values: FormikValues
    ) => void;
    required: boolean;
    disabled: boolean;
    fieldProps?: TextFieldProps;
}

const TextElement = ({ name, label, error, help, required, disabled, onChange, fieldProps }: TextElementProps) => {
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(name, event.currentTarget.value);
    };

    const callableOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(name, setFieldValue, event, () => defaultOnChange(event), values);
            return;
        }

        defaultOnChange(event);
    };

    const hasError = error ? true : false;
    const internalFieldProps: TextFieldProps = {
        value: getIn(values, name, ""),
        onChange: callableOnChange,
        error: hasError,
        label,
        required,
        disabled,
        fullWidth: true,
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

    return <MuiTextField {...mergedFieldProps} />;
};

export default TextElement;
export { TextElementProps };
