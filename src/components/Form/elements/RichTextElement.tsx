import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import {
    FormControl,
    FormControlProps,
    FormHelperText,
    InputLabel,
    InputLabelProps,
    makeStyles,
} from "@material-ui/core";
import FieldElementInterface from "@arteneo/forge/components/Form/definitions/FieldElementInterface";
import {
    Descendant,
    Slate,
    SlateProps,
    SlatePluginsType,
    serialize,
    Body,
    Br,
    Bold,
    Italic,
    Strikethrough,
    Underline,
    Color,
    Link,
    Nbsp,
    Heading,
    Paragraph,
    OrderedList,
    UnorderedList,
    Clear,
    Undo,
    Redo,
} from "@arteneo/material-ui-slate";

interface RichTextElementSpecificProps {
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: Descendant[],
        onChange: () => void,
        values: FormikValues,
        name: string
    ) => void;
    slateProps?: SlateProps;
    formControlProps?: FormControlProps;
    labelProps?: InputLabelProps;
}

type RichTextElementProps = RichTextElementSpecificProps & FieldElementInterface;

const useStyles = makeStyles(() => ({
    slateWrapper: {
        display: "block",
    },
}));

const RichTextElement = ({
    name,
    path,
    label,
    error,
    help,
    required,
    disabled,
    onChange,
    slateProps,
    formControlProps,
    labelProps,
}: RichTextElementProps) => {
    // TODO Handle plugins somehow
    const plugins: SlatePluginsType = [
        Body,
        Br,
        Bold,
        Italic,
        Strikethrough,
        Underline,
        Color,
        Link,
        Nbsp,
        Heading,
        Paragraph,
        OrderedList,
        UnorderedList,
        Clear,
        Undo,
        Redo,
    ];

    const classes = useStyles();
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    const defaultOnChange = (value: Descendant[]) => {
        setFieldValue(path, serialize(value, plugins));
    };

    const callableOnChange = (value: Descendant[]) => {
        if (onChange) {
            onChange(path, setFieldValue, value, () => defaultOnChange(value), values, name);
            return;
        }

        defaultOnChange(value);
    };

    const hasError = error ? true : false;

    const internalFormControlProps: FormControlProps = {
        fullWidth: true,
        margin: "normal",
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const internalSlateProps: SlateProps = {
        initialHtml: getIn(values, path, undefined),
        plugins,
        onChange: callableOnChange,
        disabled,
    };

    const internalLabelProps: InputLabelProps = {
        shrink: true,
        error: hasError,
        required: required,
    };
    const mergedLabelProps = Object.assign(internalLabelProps, labelProps);

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

    const mergedSlateProps = Object.assign(internalSlateProps, slateProps);

    return (
        <FormControl {...mergedFormControlProps}>
            {label && <InputLabel {...mergedLabelProps}>{label}</InputLabel>}
            <div
                className={
                    classes.slateWrapper +
                    " MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl"
                }
            >
                <Slate {...mergedSlateProps} />
            </div>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default RichTextElement;
export { RichTextElementProps, RichTextElementSpecificProps };
