import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { makeStyles, TextField as MuiTextField, TextFieldProps } from "@material-ui/core";

interface Props {
    name: string;
    label?: React.ReactNode;
    error?: string;
    help?: React.ReactNode;
    onChange?: (
        name: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        onChange: () => void
    ) => void;
    required: boolean;
    disabled: boolean;
    disableResize?: boolean;
    fieldProps?: TextFieldProps;
}

const useStyles = makeStyles(() => ({
    resize: {
        "& .MuiInputBase-inputMultiline": {
            resize: "vertical",
        },
    },
}));

const Textarea: React.FC<Props> = ({
    name,
    label,
    error,
    help,
    required,
    disabled,
    onChange,
    disableResize,
    fieldProps,
}: Props) => {
    const classes = useStyles();
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(name, event.currentTarget.value);
    };

    const callableOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(name, setFieldValue, event, () => defaultOnChange(event));
            return;
        }

        defaultOnChange(event);
    };

    const hasError = error ? true : false;
    const internalFieldProps: TextFieldProps = {
        value: getIn(values, name, ""),
        onChange: callableOnChange,
        className: disableResize ? undefined : classes.resize,
        error: hasError,
        label,
        required,
        disabled,
        multiline: true,
        rows: 3,
        rowsMax: 6,
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

export default Textarea;
