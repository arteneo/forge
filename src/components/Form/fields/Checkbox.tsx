import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import {
    FormControl,
    FormControlProps,
    FormHelperText,
    Checkbox as MuiCheckbox,
    FormControlLabel,
    FormControlLabelProps,
} from "@mui/material";
import FieldInterface from "../../../components/Form/definitions/FieldInterface";
import { useForm } from "../../../components/Form/contexts/Form";

interface CheckboxSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.SyntheticEvent,
        checked: boolean,
        onChange: () => void,
        values: FormikValues,
        name: string
    ) => void;
    formControlLabelProps?: FormControlLabelProps;
    formControlProps?: FormControlProps;
}

type CheckboxProps = CheckboxSpecificProps & FieldInterface;

const Checkbox = ({ onChange, formControlLabelProps, formControlProps, ...field }: CheckboxProps) => {
    const {
        values,
        touched,
        errors,
        submitCount,
        setFieldValue,
        registerField,
        unregisterField,
    }: FormikProps<FormikValues> = useFormikContext();
    const { resolveField } = useForm();
    const { name, path, label, error, hasError, help, required, disabled, hidden, validate } = resolveField({
        values,
        touched,
        errors,
        submitCount,
        ...field,
    });

    React.useEffect(() => {
        if (hidden || typeof validate === "undefined") {
            return;
        }

        registerField(name, {
            validate: () => validate,
        });

        return () => {
            unregisterField(name);
        };
    }, [hidden, registerField, unregisterField, name, validate]);

    if (hidden) {
        return null;
    }

    const defaultOnChange = (event: React.SyntheticEvent, checked: boolean) => {
        setFieldValue(path, checked);
    };

    const callableOnChange = (event: React.SyntheticEvent, checked: boolean) => {
        if (onChange) {
            onChange(path, setFieldValue, event, checked, () => defaultOnChange(event, checked), values, name);
            return;
        }

        defaultOnChange(event, checked);
    };

    const internalFormControlProps: FormControlProps = {
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const internalFormControlLabelProps: FormControlLabelProps = {
        checked: Boolean(getIn(values, path, false)),
        control: <MuiCheckbox {...{ required }} />,
        onChange: callableOnChange,
        // Brutal solution. Looking for better one
        label: label as React.ReactElement,
        disabled,
    };
    const mergedFormControlLabelProps = Object.assign(internalFormControlLabelProps, formControlLabelProps);

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

    return (
        <FormControl {...mergedFormControlProps}>
            <FormControlLabel {...mergedFormControlLabelProps} />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default Checkbox;
export { CheckboxProps, CheckboxSpecificProps };
