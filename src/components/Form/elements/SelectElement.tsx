import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import MuiTextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import { FormControl, FormControlProps, FormHelperText } from "@material-ui/core";
import {
    Autocomplete,
    AutocompleteChangeReason,
    AutocompleteChangeDetails,
    AutocompleteProps,
    AutocompleteRenderInputParams,
} from "@material-ui/lab";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";
import {
    SelectValueType,
    Multiple,
    DisableClearable,
    FreeSolo,
} from "@arteneo/forge/components/Form/definitions/AutocompleteTypes";

type SelectElementAutocompleteProps = AutocompleteProps<OptionInterface, Multiple, DisableClearable, FreeSolo>;
type SelectElementAutocompletePartialProps<T> = {
    [P in keyof T]?: T[P];
};
// We need to allow passing autocomplete props without required ones. They are filled by component.
type SelectElementAutocompleteOptionalProps = SelectElementAutocompletePartialProps<SelectElementAutocompleteProps>;

interface SelectElementProps {
    name: string;
    options: OptionsType;
    disableTranslateOption?: boolean;
    label?: React.ReactNode;
    placeholder?: string;
    error?: string;
    help?: React.ReactNode;
    onChange?: (
        name: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        onChange: () => void,
        values: FormikValues,
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => void;
    required: boolean;
    disabled: boolean;
    groupBy?: (option: OptionInterface) => string;
    disableTranslateGroupBy?: boolean;
    autocompleteProps?: SelectElementAutocompleteOptionalProps;
    formControlProps?: FormControlProps;
}

const SelectElement = ({
    name,
    options,
    label,
    placeholder,
    error,
    help,
    required = false,
    disabled = false,
    disableTranslateOption = false,
    onChange,
    groupBy,
    disableTranslateGroupBy,
    autocompleteProps,
    formControlProps,
}: SelectElementProps) => {
    const { t } = useTranslation();
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    const defaultOnChange = (
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        value: SelectValueType,
        reason: AutocompleteChangeReason,
        // eslint-disable-next-line
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => {
        if (reason === "clear") {
            setFieldValue(name, null);
            return;
        }

        if (value === null || Array.isArray(value) || typeof value === "string") {
            return;
        }

        setFieldValue(name, value.id);
    };

    const callableOnChange = (
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        value: SelectValueType,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => {
        if (onChange) {
            // Parameters are swapped for convenience
            onChange(
                name,
                setFieldValue,
                value,
                () => defaultOnChange(event, value, reason, details),
                values,
                event,
                reason,
                details
            );
            return;
        }

        defaultOnChange(event, value, reason, details);
    };

    const hasError = error ? true : false;
    const internalFormControlProps: FormControlProps = {
        fullWidth: true,
        margin: "normal",
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <MuiTextField
            {...{
                label,
                required,
                placeholder,
                ...params,
            }}
        />
    );
    const internalAutocompleteProps: SelectElementAutocompleteProps = {
        renderInput: renderInput,
        options: options,
        value: null,
        loadingText: t("placeholder.loading"),
        noOptionsText: t("placeholder.selectSingleEmpty"),
        getOptionSelected: (option: OptionInterface, value: OptionInterface) => option.id === value.id,
        getOptionLabel: (option: OptionInterface) =>
            disableTranslateOption ? option.representation : t(option.representation),
        disabled: disabled,
        onChange: callableOnChange,
        fullWidth: true,
    };

    if (typeof groupBy !== "undefined") {
        internalAutocompleteProps.groupBy = (option: OptionInterface) =>
            disableTranslateGroupBy ? groupBy(option) : t(groupBy(option));
    }

    const value = getIn(values, name, undefined);
    if (typeof value !== "undefined") {
        const optionSelected = options.find((option) => {
            return option.id == value;
        });
        internalAutocompleteProps.value = optionSelected ?? null;
    }

    const mergedAutocompleteProps = Object.assign(internalAutocompleteProps, autocompleteProps);

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
            <Autocomplete {...mergedAutocompleteProps} />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default SelectElement;
export { SelectElementProps, SelectElementAutocompleteProps, SelectElementAutocompleteOptionalProps };
