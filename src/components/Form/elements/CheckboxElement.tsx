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
import FieldElementInterface from "@arteneo/forge/components/Form/definitions/FieldElementInterface";

interface CheckboxElementProps extends FieldElementInterface {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        checked: boolean,
        onChange: () => void,
        values: FormikValues,
        name: string
    ) => void;
    formControlLabelProps?: FormControlLabelProps;
    formControlProps?: FormControlProps;
}

const CheckboxElement = ({
    name,
    path,
    label,
    error,
    help,
    required,
    disabled,
    onChange,
    formControlLabelProps,
    formControlProps,
}: CheckboxElementProps) => {
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    // eslint-disable-next-line
    const defaultOnChange = (event: React.ChangeEvent<{}>, checked: boolean) => {
        setFieldValue(path, checked);
    };

    // eslint-disable-next-line
    const callableOnChange = (event: React.ChangeEvent<{}>, checked: boolean) => {
        if (onChange) {
            onChange(path, setFieldValue, event, checked, () => defaultOnChange(event, checked), values, name);
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
        checked: Boolean(getIn(values, path, false)),
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

export default CheckboxElement;
export { CheckboxElementProps };
