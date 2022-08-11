import React from "react";
import * as Yup from "yup";
import {
    Box,
    FormControl,
    FormControlProps,
    FormHelperText,
    Select,
    MenuItem,
    InputLabel,
    SelectProps,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { ChromePicker, ChromePickerProps, ColorResult } from "react-color";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { useForm } from "../../../components/Form/contexts/Form";
import FieldInterface from "../../../components/Form/definitions/FieldInterface";

interface ColorPickerSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        color: ColorResult,
        onChange: () => void,
        values: FormikValues,
        event: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => void;
    selectProps?: SelectProps;
    formControlProps?: FormControlProps;
    chromePickerProps?: ChromePickerProps;
    disableClear?: boolean;
}

type ColorPickerProps = ColorPickerSpecificProps & FieldInterface;

const ColorPicker = ({
    onChange,
    selectProps,
    formControlProps,
    chromePickerProps,
    disableClear = false,
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        if (required && !Yup.string().required().isValidSync(value)) {
            return "validation.required";
        }

        return undefined;
    },
    ...field
}: ColorPickerProps) => {
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
        validate: fieldValidate,
        ...field,
    });

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

    const defaultOnChange = (color: ColorResult) => {
        setFieldValue(path, color.hex);
    };

    const callableOnChange = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            // Parameters are swapped for convenience
            onChange(path, setFieldValue, color, () => defaultOnChange(color), values, event, name);
            return;
        }

        defaultOnChange(color);
    };

    const internalFormControlProps: FormControlProps = {
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const clearValue = () => {
        setFieldValue(path, undefined);
    };

    const value = getIn(values, path, "");

    const internalSelectProps: SelectProps = {
        value,
        label,
        disabled,
        required,
        autoWidth: true,
    };

    if (value) {
        internalSelectProps.startAdornment = (
            <InputAdornment {...{ position: "start", sx: { height: "100%" } }}>
                <Box {...{ sx: { backgroundColor: value, borderRadius: "50%", width: "1.5em", height: "1.5em" } }} />
            </InputAdornment>
        );
    }

    internalSelectProps.endAdornment = (
        // Opacity 1 and 0 is used to keep size and avoid jumping of select popover after selecting a value
        <InputAdornment {...{ position: "start", sx: { mr: 2, opacity: value && !disableClear ? 1 : 0 } }}>
            <IconButton {...{ onClick: () => clearValue(), size: "small" }}>
                <Close {...{ fontSize: "small" }} />
            </IconButton>
        </InputAdornment>
    );

    const mergedSelectProps = Object.assign(internalSelectProps, selectProps);

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

    const internalChromePickerProps: ChromePickerProps = {
        color: value,
        // Alpha is by default disabled. onChange would need to store something else than hex value
        disableAlpha: true,
        onChange: callableOnChange,
        styles: {
            default: {
                picker: {
                    fontFamily: "inherit",
                    boxShadow: "none",
                },
                saturation: {
                    borderRadius: 0,
                },
            },
        },
    };

    const mergedChromePickerProps = Object.assign(internalChromePickerProps, chromePickerProps);

    return (
        <FormControl {...mergedFormControlProps}>
            {label && <InputLabel {...{ required }}>{label}</InputLabel>}
            <Select {...mergedSelectProps}>
                {/* Hidden MenuItem is used to give Select a proper value to show in input  */}
                <MenuItem {...{ sx: { display: "none" }, value }}>{value}</MenuItem>
                <ChromePicker {...mergedChromePickerProps} />
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default ColorPicker;
export { ColorPickerProps, ColorPickerSpecificProps };
