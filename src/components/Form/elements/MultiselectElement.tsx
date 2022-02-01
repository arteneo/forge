import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { useTranslation } from "react-i18next";
import {
    Checkbox,
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
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";
import {
    SelectValueType,
    Multiple,
    DisableClearable,
    FreeSolo,
} from "@arteneo/forge/components/Form/definitions/AutocompleteTypes";
import FieldElementPlaceholderInterface from "@arteneo/forge/components/Form/definitions/FieldElementPlaceholderInterface";

type MultiselectElementAutocompleteProps = AutocompleteProps<OptionInterface, Multiple, DisableClearable, FreeSolo>;
type MultiselectElementAutocompletePartialProps<T> = {
    [P in keyof T]?: T[P];
};
// We need to allow passing autocomplete props without required ones. They are filled by component.
type MultiselectElementAutocompleteOptionalProps =
    MultiselectElementAutocompletePartialProps<MultiselectElementAutocompleteProps>;

interface MultiselectElementSpecificProps {
    options: OptionsType;
    disableTranslateOption?: boolean;
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        onChange: () => void,
        values: FormikValues,
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        reason: AutocompleteChangeReason,
        name: string,
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => void;
    groupBy?: (option: OptionInterface) => string;
    disableTranslateGroupBy?: boolean;
    autocompleteProps?: MultiselectElementAutocompleteOptionalProps;
    formControlProps?: FormControlProps;
}

type MultiselectElementProps = MultiselectElementSpecificProps & FieldElementPlaceholderInterface;

const MultiselectElementRenderInput = (params: AutocompleteRenderInputParams) => <MuiTextField {...params} />;

const MultiselectElement = ({
    name,
    path,
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
}: MultiselectElementProps) => {
    const { t } = useTranslation();
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    const defaultOnChange = (
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        value: SelectValueType,
        reason: AutocompleteChangeReason
    ) => {
        if (reason === "clear") {
            setFieldValue(path, "");
            return;
        }

        if (!Array.isArray(value)) {
            return;
        }

        const newValues = value.map((valueOption) => {
            if (typeof valueOption === "string") {
                return;
            }

            return valueOption.id;
        });
        setFieldValue(path, newValues);
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

    const value = getIn(values, path, []);
    const hasError = error ? true : false;
    const internalFormControlProps: FormControlProps = {
        fullWidth: true,
        margin: "normal",
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const renderInput = (params: AutocompleteRenderInputParams) => (
        // inputProps are additionally processed and set required prop based on currently selected values
        // This allows to allows proper submitting when required = true
        <MultiselectElementRenderInput
            {...{
                label,
                required,
                placeholder,
                error: hasError,
                ...params,
                inputProps: {
                    ...params.inputProps,
                    required: required ? value.length === 0 : false,
                },
            }}
        />
    );

    const internalAutocompleteProps: MultiselectElementAutocompleteProps = {
        renderInput,
        options,
        value: [],
        multiple: true,
        loadingText: t("placeholder.loading"),
        noOptionsText: t("placeholder.selectSingleEmpty"),
        disableCloseOnSelect: true,
        getOptionLabel: (option: OptionInterface) =>
            disableTranslateOption ? option.representation : t(option.representation),
        renderOption: (props, option, { selected }) => (
            <li {...props}>
                <Checkbox
                    {...{
                        icon: <CheckBoxOutlineBlank {...{ fontSize: "small" }} />,
                        checkedIcon: <CheckBox {...{ fontSize: "small" }} />,
                        style: { marginRight: 8 },
                        checked: selected,
                    }}
                />
                {disableTranslateOption ? option.representation : t(option.representation)}
            </li>
        ),
        disabled: disabled,
        onChange: callableOnChange,
        fullWidth: true,
    };

    if (typeof groupBy !== "undefined") {
        internalAutocompleteProps.groupBy = (option: OptionInterface) =>
            disableTranslateGroupBy ? groupBy(option) : t(groupBy(option));
    }

    if (typeof value !== "undefined") {
        const optionSelected = options.filter((option) => {
            return value.includes(option.id);
        });
        internalAutocompleteProps.value = optionSelected ?? [];
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

export default MultiselectElement;
export {
    MultiselectElementProps,
    MultiselectElementSpecificProps,
    MultiselectElementAutocompleteProps,
    MultiselectElementAutocompleteOptionalProps,
    MultiselectElementRenderInput,
};
