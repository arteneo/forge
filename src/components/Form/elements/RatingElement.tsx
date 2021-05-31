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
import { Rating, RatingProps } from "@material-ui/lab";

interface RatingElementSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        onChange: () => void,
        values: FormikValues,
        name: string
    ) => void;
    formLabelProps?: FormLabelProps;
    ratingProps?: RatingProps;
    boxProps?: BoxProps;
    formControlProps?: FormControlProps;
}

type RatingElementProps = RatingElementSpecificProps & FieldElementInterface;

const RatingElement = ({
    name,
    path,
    label,
    error,
    help,
    required,
    disabled,
    onChange,
    formLabelProps,
    ratingProps,
    boxProps,
    formControlProps,
}: RatingElementProps) => {
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    // eslint-disable-next-line
    const defaultOnChange = (event: React.ChangeEvent<{}>, value: number | null) => {
        setFieldValue(path, value);
    };

    // eslint-disable-next-line
    const callableOnChange = (event: React.ChangeEvent<{}>, value: number | null) => {
        if (onChange) {
            onChange(path, setFieldValue, event, () => defaultOnChange(event, value), values, name);
            return;
        }

        defaultOnChange(event, value);
    };

    const hasError = error ? true : false;
    const internalFormControlProps: FormControlProps = {
        className: "MuiFormControl-rating",
        fullWidth: true,
        margin: "normal",
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const internalRatingProps: RatingProps = {
        className: "MuiRating-input",
        value: getIn(values, path, ""),
        onChange: callableOnChange,
        readOnly: disabled,
    };
    const mergedRatingProps = Object.assign(internalRatingProps, ratingProps);

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
                <Rating {...mergedRatingProps} />
            </Box>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default RatingElement;
export { RatingElementProps, RatingElementSpecificProps };
