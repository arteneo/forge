import React from "react";
import * as Yup from "yup";
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
import { Close } from "@mui/icons-material";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { useTranslation } from "react-i18next";
import { useForm } from "../../../components/Form/contexts/Form";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import FieldInterface from "../../../components/Form/definitions/FieldInterface";

interface RadioSpecificProps {
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

type RadioProps = RadioSpecificProps & FieldInterface;

const Radio = ({
    options,
    disableTranslateOption,
    enableClear = false,
    clearLabel = "radio.clear",
    onChange,
    formLabelProps,
    radioGroupProps,
    formControlLabelProps,
    formControlProps,
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        if (required && !Yup.string().required().isValidSync(value)) {
            return "validation.required";
        }

        return undefined;
    },
    ...field
}: RadioProps) => {
    const { t } = useTranslation();
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
    const { resolveField } = useForm();
    const { name, path, label, error, hasError, help, required, disabled, hidden, validate } = resolveField({
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

    const internalFormControlProps: FormControlProps = {
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const internalRadioGroupProps: RadioGroupProps = {
        value: getIn(values, path, ""),
        row: true,
        onChange: callableOnChange,
        onBlur: () => setFieldTouched(path, true),
    };
    const mergedRadioGroupProps = Object.assign(internalRadioGroupProps, radioGroupProps);

    const internalFormLabelProps: FormLabelProps = {
        required,
    };
    const mergedFormLabelProps = Object.assign(internalFormLabelProps, formLabelProps);

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

    let clearComponent: null | React.ReactElement = null;
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
                            control: <MuiRadio {...{ required, disabled }} />,
                            label: disableTranslateOption
                                ? option.representation // as string is just for TypeScript
                                : (t(option.representation) as string),
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

export default Radio;
export { RadioProps, RadioSpecificProps };
