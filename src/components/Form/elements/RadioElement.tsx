import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { useTranslation } from "react-i18next";
import {
    Radio as MuiRadio,
    RadioGroup,
    RadioGroupProps,
    FormControl,
    FormControlProps,
    FormHelperText,
    FormLabel,
    FormLabelProps,
    FormControlLabel,
    FormControlLabelProps,
    IconButton,
    Tooltip,
} from "@mui/material";
import FieldElementInterface from "@arteneo/forge/components/Form/definitions/FieldElementInterface";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import Close from "@mui/icons-material/Close";

interface RadioElementSpecificProps {
    options: OptionsType;
    disableTranslateOption?: boolean;
    enableClear?: boolean;
    clearLabel?: string;
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        value: string,
        onChange: () => void,
        values: FormikValues,
        name: string
    ) => void;
    formLabelProps?: FormLabelProps;
    radioGroupProps?: RadioGroupProps;
    formControlLabelProps?: FormControlLabelProps;
    formControlProps?: FormControlProps;
}

type RadioElementProps = RadioElementSpecificProps & FieldElementInterface;

const RadioElement = ({
    name,
    path,
    options,
    label,
    error,
    help,
    required,
    disabled,
    enableClear = false,
    clearLabel = "action.form.radioClear",
    disableTranslateOption = false,
    onChange,
    formLabelProps,
    radioGroupProps,
    formControlLabelProps,
    formControlProps,
}: RadioElementProps) => {
    const { t } = useTranslation();
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setFieldValue(path, value);
    };

    const callableOnChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        if (onChange) {
            onChange(path, setFieldValue, event, value, () => defaultOnChange(event, value), values, name);
            return;
        }

        defaultOnChange(event, value);
    };

    const value = getIn(values, path, "");

    const hasError = error ? true : false;
    const internalFormControlProps: FormControlProps = {
        fullWidth: true,
        margin: "normal",
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const internalRadioGroupProps: RadioGroupProps = {
        value,
        row: true,
        onChange: callableOnChange,
    };
    const mergedRadioGroupProps = Object.assign(internalRadioGroupProps, radioGroupProps);

    const internalFormLabelProps: FormLabelProps = {
        required: required,
    };
    const mergedFormLabelProps = Object.assign(internalFormLabelProps, formLabelProps);

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

    let clearComponent = null;
    if (enableClear) {
        const clearValue = () => {
            setFieldValue(path, undefined);
        };

        clearComponent = (
            <IconButton onClick={() => clearValue()}>
                <Close />
            </IconButton>
        );

        if (typeof clearLabel !== "undefined") {
            // t(clearLabel) "?? clearLabel" is just for TypeScript
            clearComponent = <Tooltip title={t(clearLabel) ?? clearLabel}>{clearComponent}</Tooltip>;
        }
    }

    return (
        <FormControl {...mergedFormControlProps}>
            {label && <FormLabel {...mergedFormLabelProps}>{label}</FormLabel>}
            <RadioGroup {...mergedRadioGroupProps}>
                {options.map((option, key) => (
                    <FormControlLabel
                        key={key}
                        {...{
                            value: String(option.id),
                            control: <MuiRadio required={required} disabled={disabled} />,
                            label: disableTranslateOption ? option.representation : t(option.representation),
                            ...formControlLabelProps,
                        }}
                    />
                ))}
                {clearComponent}
            </RadioGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default RadioElement;
export { RadioElementProps, RadioElementSpecificProps };
