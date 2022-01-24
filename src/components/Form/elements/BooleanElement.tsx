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

interface BooleanElementSpecificProps {
    trueOptionLabel?: string;
    falseOptionLabel?: string;
    disableTranslateOption?: boolean;
    enableClear?: boolean;
    clearLabel?: string;
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        value: undefined | boolean,
        onChange: () => void,
        values: FormikValues,
        name: string
    ) => void;
    formLabelProps?: FormLabelProps;
    radioGroupProps?: RadioGroupProps;
    formControlLabelProps?: FormControlLabelProps;
    formControlProps?: FormControlProps;
}

type BooleanElementProps = BooleanElementSpecificProps & FieldElementInterface;

const BooleanElement = ({
    name,
    path,
    trueOptionLabel = "label.yes",
    falseOptionLabel = "label.no",
    label,
    error,
    help,
    required,
    disabled,
    enableClear = false,
    clearLabel = "action.form.booleanClear",
    disableTranslateOption = false,
    onChange,
    formLabelProps,
    radioGroupProps,
    formControlLabelProps,
    formControlProps,
}: BooleanElementProps) => {
    const { t } = useTranslation();
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    const transformValue = (value?: boolean): string => {
        if (value === true) {
            return "true";
        }

        if (value === false) {
            return "false";
        }

        return "";
    };

    const reverseTransformValue = (value?: string): undefined | boolean => {
        if (value === "true") {
            return true;
        }

        if (value === "false") {
            return false;
        }

        return undefined;
    };

    const options: OptionsType = [
        {
            id: transformValue(true),
            representation: trueOptionLabel,
        },
        {
            id: transformValue(false),
            representation: falseOptionLabel,
        },
    ];

    const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>, value: undefined | boolean) => {
        setFieldValue(path, value);
    };

    const callableOnChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        const transformedValue = reverseTransformValue(value);

        if (onChange) {
            onChange(
                path,
                setFieldValue,
                event,
                transformedValue,
                () => defaultOnChange(event, transformedValue),
                values,
                name
            );
            return;
        }

        defaultOnChange(event, transformedValue);
    };

    const value = getIn(values, path, undefined);

    const hasError = error ? true : false;
    const internalFormControlProps: FormControlProps = {
        fullWidth: true,
        margin: "normal",
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const internalRadioGroupProps: RadioGroupProps = {
        value: transformValue(value),
        row: true,
        onChange: callableOnChange,
    };
    const mergedRadioGroupProps = Object.assign(internalRadioGroupProps, radioGroupProps);

    const internalFormLabelProps: FormLabelProps = {
        required: required,
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
                            control: <MuiRadio required={required} disabled={disabled} />,
                            // as string is just for TypeScript
                            label: disableTranslateOption
                                ? option.representation
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

export default BooleanElement;
export { BooleanElementProps, BooleanElementSpecificProps };
