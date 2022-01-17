import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import {
    FormControl,
    FormControlProps,
    FormHelperText,
    FormLabel,
    FormLabelProps,
    Box,
    BoxProps,
} from "@material-ui/core";
import FieldElementInterface from "@arteneo/forge/components/Form/definitions/FieldElementInterface";
import { Slider, SliderProps } from "@material-ui/core";

interface SliderElementSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: number | number[],
        onChange: (value: number | number[]) => void,
        values: FormikValues,
        name: string
    ) => void;
    onPartialChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: number | number[],
        onChange: (value: number | number[]) => void,
        values: FormikValues,
        name: string
    ) => void;
    defaultValue?: number; // if its set range slider can be used
    defaultValue2?: number; // if its set range slider can be used
    resolvedPath2?: string; // if its set range slider can be used
    formLabelProps?: FormLabelProps;
    sliderProps?: SliderProps;
    boxProps?: BoxProps;
    formControlProps?: FormControlProps;
}

type SliderElementProps = SliderElementSpecificProps & FieldElementInterface;

const SliderElement = ({
    name,
    path,
    resolvedPath2,
    label,
    error,
    help,
    required,
    disabled,
    onChange,
    onPartialChange,
    formLabelProps,
    sliderProps,
    boxProps,
    formControlProps,
    defaultValue = 0,
    defaultValue2 = 0,
}: SliderElementProps) => {
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();
    const [componentValue, setComponentValue] = React.useState<undefined | number | number[]>(undefined);

    const getFormikValue = () => {
        let value = getIn(values, path, defaultValue);
        if (resolvedPath2) {
            value = [getIn(values, path, defaultValue), getIn(values, resolvedPath2, defaultValue2)];
        }
        return value;
    };

    React.useEffect(
        () => initializeValues(),
        [getIn(values, path, defaultValue), resolvedPath2 ? getIn(values, resolvedPath2, defaultValue2) : undefined]
    );

    const initializeValues = () => {
        if (!Array.isArray(getFormikValue())) {
            if (componentValue != getFormikValue()) {
                setComponentValue(getFormikValue());
            }
        } else {
            if (JSON.stringify(componentValue) !== JSON.stringify(getFormikValue())) {
                setComponentValue(getFormikValue());
            }
        }
        callableOnChange(getFormikValue());
    };

    // eslint-disable-next-line
    const defaultOnChange = (value: number | number[]) => {
        if (!Array.isArray(value)) {
            setFieldValue(path, value);
        } else {
            setFieldValue(path, value[0]);
            if (resolvedPath2) {
                setFieldValue(resolvedPath2, value[1]);
            }
        }
    };

    // eslint-disable-next-line
    const callableOnChange = (value: number | number[]) => {
        if (onChange) {
            onChange(path, setFieldValue, value, () => defaultOnChange(value), values, name);
            return;
        }

        defaultOnChange(value);
    };

    const defaultPartialOnChange = (value: number | number[]) => {
        setComponentValue((componentValue) => {
            if (JSON.stringify(componentValue) !== JSON.stringify(value)) {
                return Array.isArray(value) ? value.slice() : value;
            }
            return componentValue;
        });
    };

    const callablePartialOnChange = (value: number | number[]) => {
        if (onPartialChange) {
            onPartialChange(path, setFieldValue, value, () => defaultPartialOnChange(value), values, name);
            return;
        }

        defaultPartialOnChange(value);
    };

    const hasError = error ? true : false;
    const internalFormControlProps: FormControlProps = {
        className: "MuiFormControl-slider",
        fullWidth: true,
        margin: "normal",
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const getComponentValue = () => {
        if (componentValue !== undefined) {
            return componentValue;
        }

        let value = getIn(values, path, defaultValue);
        if (resolvedPath2) {
            value = [getIn(values, path, defaultValue), getIn(values, resolvedPath2, defaultValue2)];
        }

        if (JSON.stringify(componentValue) !== JSON.stringify(value)) {
            setComponentValue(value);
        }

        return value !== undefined ? value : 0;
    };

    const internalSliderProps: SliderProps = {
        name: path,
        className: "MuiSlider-input",
        value: getComponentValue(),
        onChangeCommitted: (event, newValue) => callableOnChange(newValue),
        // eslint-disable-next-line
        onChange: (event: object, newValue: number | number[] = 0) => callablePartialOnChange(newValue),
        disabled: disabled,
    };
    const mergedSliderProps = Object.assign(internalSliderProps, sliderProps);

    const internalFormLabelProps: FormLabelProps = {
        disabled,
        error: hasError,
        required: required,
    };
    const mergedFormLabelProps = Object.assign(internalFormLabelProps, formLabelProps);

    const internalBoxProps: BoxProps = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    };
    const mergedBoxProps = Object.assign(internalBoxProps, boxProps);

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
            <Box {...mergedBoxProps}>
                {label && <FormLabel {...mergedFormLabelProps}>{label}</FormLabel>}
                <Slider {...mergedSliderProps} />
            </Box>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default SliderElement;
export { SliderElementProps, SliderElementSpecificProps };
