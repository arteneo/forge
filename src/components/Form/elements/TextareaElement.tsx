import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { makeStyles, TextField as MuiTextField, TextFieldProps } from "@material-ui/core";
import FieldElementPlaceholderInterface from "@arteneo/forge/components/Form/definitions/FieldElementPlaceholderInterface";

interface TextareaElementSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: () => void,
        values: FormikValues,
        name: string
    ) => void;
    disableResize?: boolean;
    fieldProps?: TextFieldProps;
}

type TextareaElementProps = TextareaElementSpecificProps & FieldElementPlaceholderInterface;

const useStyles = makeStyles(() => ({
    resize: {
        "& .MuiInputBase-inputMultiline": {
            resize: "vertical",
        },
    },
}));

const TextareaElement = ({
    name,
    path,
    label,
    placeholder,
    error,
    help,
    required,
    disabled,
    onChange,
    disableResize,
    fieldProps,
}: TextareaElementProps) => {
    const classes = useStyles();
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

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
        className: disableResize ? undefined : classes.resize,
        error: hasError,
        label,
        placeholder,
        required,
        disabled,
        multiline: true,
        // minRows: 3,
        maxRows: 6,
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

export default TextareaElement;
export { TextareaElementProps, TextareaElementSpecificProps };
