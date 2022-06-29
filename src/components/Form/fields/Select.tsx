import React from "react";
import * as Yup from "yup";
import {
    TextField as MuiTextField,
    FormControl,
    FormControlProps,
    FormHelperText,
    Autocomplete,
    AutocompleteChangeReason,
    AutocompleteChangeDetails,
    AutocompleteProps,
    AutocompleteRenderInputParams,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { useForm } from "../../../components/Form/contexts/Form";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import OptionInterface from "../../../components/Form/definitions/OptionInterface";
import FieldPlaceholderInterface from "../../../components/Form/definitions/FieldPlaceholderInterface";
import {
    SelectValueType,
    Multiple,
    DisableClearable,
    FreeSolo,
} from "../../../components/Form/definitions/AutocompleteTypes";

type SelectElementAutocompleteProps = AutocompleteProps<OptionInterface, Multiple, DisableClearable, FreeSolo>;
type SelectElementAutocompletePartialProps<T> = {
    [P in keyof T]?: T[P];
};
// We need to allow passing autocomplete props without required ones. They are filled by component.
type SelectElementAutocompleteOptionalProps = SelectElementAutocompletePartialProps<SelectElementAutocompleteProps>;

interface SelectSpecificProps {
    options: OptionsType;
    disableTranslateOption?: boolean;
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        onChange: () => void,
        values: FormikValues,
        event: React.SyntheticEvent,
        reason: AutocompleteChangeReason,
        name: string,
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => void;
    groupBy?: (option: OptionInterface) => string;
    disableTranslateGroupBy?: boolean;
    renderInput?: (params: SelectRenderInputProps) => React.ReactNode;
    autocompleteProps?: SelectElementAutocompleteOptionalProps;
    formControlProps?: FormControlProps;
}

type SelectProps = SelectSpecificProps & FieldPlaceholderInterface;

interface SelectRenderInputProps extends AutocompleteRenderInputParams {
    label?: React.ReactNode;
    required: boolean;
    placeholder?: string;
    onBlur: () => void;
    error: boolean; // This is hasError from FieldResolvedInterface
}

const SelectRenderInput = (params: SelectRenderInputProps) => <MuiTextField {...params} />;

const Select = ({
    options,
    disableTranslateOption,
    onChange,
    groupBy,
    disableTranslateGroupBy,
    renderInput,
    autocompleteProps,
    formControlProps,
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        if (required && !Yup.string().required().isValidSync(value)) {
            return "validation.required";
        }

        return undefined;
    },
    ...field
}: SelectProps) => {
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
    const { resolvePlaceholderField } = useForm();
    const { name, path, label, error, hasError, help, required, disabled, hidden, validate, placeholder } =
        resolvePlaceholderField({
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

    const defaultOnChange = (event: React.SyntheticEvent, value: SelectValueType, reason: AutocompleteChangeReason) => {
        if (reason === "clear") {
            setFieldValue(path, "");
            return;
        }

        if (value === null || Array.isArray(value) || typeof value === "string") {
            return;
        }

        setFieldValue(path, value.id);
    };

    const callableOnChange = (
        event: React.SyntheticEvent,
        value: SelectValueType,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => {
        if (onChange) {
            // Parameters are swapped for convenience
            onChange(
                path,
                setFieldValue,
                value,
                () => defaultOnChange(event, value, reason),
                values,
                event,
                reason,
                name,
                details
            );
            return;
        }

        defaultOnChange(event, value, reason);
    };

    const internalFormControlProps: FormControlProps = {
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const callableRenderInput = (params: AutocompleteRenderInputParams) => {
        const renderInputParams: SelectRenderInputProps = {
            label,
            required,
            placeholder,
            error: hasError,
            onBlur: () => setFieldTouched(path, true),
            ...params,
        };

        if (renderInput) {
            return renderInput(renderInputParams);
        }

        return <SelectRenderInput {...renderInputParams} />;
    };

    const internalAutocompleteProps: SelectElementAutocompleteProps = {
        renderInput: callableRenderInput,
        options,
        value: null,
        loadingText: t("select.loading"),
        noOptionsText: t("select.noOptions"),
        getOptionLabel: (option: string | OptionInterface) => {
            const label = typeof option === "string" ? option : option.representation;
            return disableTranslateOption ? label : t(label);
        },
        disabled,
        onChange: callableOnChange,
    };

    if (typeof groupBy !== "undefined") {
        internalAutocompleteProps.groupBy = (option: OptionInterface) =>
            disableTranslateGroupBy ? groupBy(option) : t(groupBy(option));
    }

    const value = getIn(values, path, undefined);
    if (typeof value !== "undefined") {
        const optionSelected = options.find((option) => {
            return option.id == value;
        });
        internalAutocompleteProps.value = optionSelected ?? null;
    }

    const mergedAutocompleteProps = Object.assign(internalAutocompleteProps, autocompleteProps);

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
            <Autocomplete {...mergedAutocompleteProps} />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default Select;
export { SelectProps, SelectSpecificProps, SelectRenderInput, SelectRenderInputProps };
