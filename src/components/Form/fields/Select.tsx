import React from "react";
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
import { useForm } from "../../../components/Form/contexts/Form";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
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
    autocompleteProps?: SelectElementAutocompleteOptionalProps;
    formControlProps?: FormControlProps;
}

type SelectProps = SelectSpecificProps & FieldPlaceholderInterface;

const SelectElementRenderInput = (params: AutocompleteRenderInputParams) => <MuiTextField {...params} />;

const Select = ({
    options,
    disableTranslateOption,
    onChange,
    groupBy,
    disableTranslateGroupBy,
    autocompleteProps,
    formControlProps,
    ...field
}: SelectProps) => {
    const { t } = useTranslation();
    const {
        values,
        touched,
        errors,
        submitCount,
        setFieldValue,
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

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <SelectElementRenderInput {...{ label, required, placeholder, error: hasError, ...params }} />
    );

    const internalAutocompleteProps: SelectElementAutocompleteProps = {
        renderInput,
        options,
        value: null,
        loadingText: t("placeholder.loading"),
        noOptionsText: t("placeholder.selectSingleEmpty"),
        getOptionLabel: (option: OptionInterface) =>
            disableTranslateOption ? option.representation : t(option.representation),
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
export { SelectProps, SelectSpecificProps };
