import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import FieldElementPlaceholderInterface from "../../../components/Form/definitions/FieldElementPlaceholderInterface";

interface TextElementSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: () => void,
        values: FormikValues,
        name: string
    ) => void;
    fieldProps?: TextFieldProps;
}

type TextElementProps = TextElementSpecificProps & FieldElementPlaceholderInterface;

const TextElement = ({
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
}: TextElementProps) => {
    const { values, setFieldValue, registerField, unregisterField }: FormikProps<FormikValues> = useFormikContext();

    const validate = () => (values.username === "1" ? "username is 1" : undefined);
    // TODO Validate stuff
    React.useEffect(() => {
        registerField(name, {
            validate: validate,
        });
        return () => {
            unregisterField(name);
        };
    }, [registerField, unregisterField, name, validate]);

    const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(path, event.currentTarget.value);
    };

    const callableOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(path, setFieldValue, event, () => defaultOnChange(event), values, name);
            return;
        }

        defaultOnChange(event);
    };

    const hasError = error ? true : false;
    const internalFieldProps: TextFieldProps = {
        value: getIn(values, path, ""),
        onChange: callableOnChange,
        error: hasError,
        label,
        placeholder,
        // TODO
        required: false,
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
export { TextElementProps, TextElementSpecificProps };
