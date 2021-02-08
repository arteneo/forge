import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import {
    FormControl,
    FormControlProps,
    FormHelperText,
    Checkbox as MuiCheckbox,
    FormControlLabel,
    FormControlLabelProps,
} from "@material-ui/core";

interface Props {
    name: string;
    label?: React.ReactNode;
    error?: string;
    help?: React.ReactNode;
    onChange?: (
        name: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        checked: boolean,
        onChange: () => void
    ) => void;
    required: boolean;
    disabled: boolean;
    formControlLabelProps?: FormControlLabelProps;
    formControlProps?: FormControlProps;
}

const Checkbox: React.FC<Props> = ({
    name,
    label,
    error,
    help,
    required,
    disabled,
    onChange,
    formControlLabelProps,
    formControlProps,
}: Props) => {
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    // eslint-disable-next-line
    const defaultOnChange = (event: React.ChangeEvent<{}>, checked: boolean) => {
        setFieldValue(name, checked);
    };

    // eslint-disable-next-line
    const callableOnChange = (event: React.ChangeEvent<{}>, checked: boolean) => {
        if (onChange) {
            onChange(name, setFieldValue, event, checked, () => defaultOnChange(event, checked));
            return;
        }

        defaultOnChange(event, checked);
    };

    const hasError = error ? true : false;
    const internalFormControlProps: FormControlProps = {
        fullWidth: true,
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const internalFormControlLabelProps: FormControlLabelProps = {
        checked: Boolean(getIn(values, name, false)),
        control: <MuiCheckbox {...{ required }} />,
        onChange: callableOnChange,
        label,
        disabled,
    };

    const mergedFormControlLabelProps = Object.assign(internalFormControlLabelProps, formControlLabelProps);

    let helperText = undefined;

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
        <FormControl {...mergedFormControlProps}>
            <FormControlLabel {...mergedFormControlLabelProps} />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default Checkbox;
