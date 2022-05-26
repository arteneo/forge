import React from "react";
import * as Yup from "yup";
import {
    Checkbox as MuiCheckbox,
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

type MultiselectAutocompleteProps = AutocompleteProps<OptionInterface, Multiple, DisableClearable, FreeSolo>;
type MultiselectAutocompletePartialProps<T> = {
    [P in keyof T]?: T[P];
};
// We need to allow passing autocomplete props without required ones. They are filled by component.
type MultiselectAutocompleteOptionalProps = MultiselectAutocompletePartialProps<MultiselectAutocompleteProps>;

interface MultiselectSpecificProps {
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
    autocompleteProps?: MultiselectAutocompleteOptionalProps;
    formControlProps?: FormControlProps;
}

type MultiselectProps = MultiselectSpecificProps & FieldPlaceholderInterface;

interface MultiselectRenderInputProps extends AutocompleteRenderInputParams {
    label?: React.ReactNode;
    required: boolean;
    placeholder?: string;
    error: boolean; // This is hasError from FieldResolvedInterface
}

const MultiselectRenderInput = (params: MultiselectRenderInputProps) => <MuiTextField {...params} />;

const Multiselect = ({
    options,
    disableTranslateOption,
    onChange,
    groupBy,
    disableTranslateGroupBy,
    autocompleteProps,
    formControlProps,
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        if (required && !Yup.array().min(1).required().isValidSync(value)) {
            return "validate.required";
        }

        return undefined;
    },
    ...field
}: MultiselectProps) => {
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

    const defaultOnChange = (event: React.SyntheticEvent, value: SelectValueType, reason: AutocompleteChangeReason) => {
        if (reason === "clear") {
            setFieldValue(path, "");
            return;
        }

        if (!Array.isArray(value)) {
            return;
        }

        const newValues = value.map((selectedOption) => {
            if (typeof selectedOption === "string") {
                return;
            }

            return selectedOption.id;
        });
        setFieldValue(path, newValues);
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

    const value = getIn(values, path, []);
    const internalFormControlProps: FormControlProps = {
        error: hasError,
    };
    const mergedFormControlProps = Object.assign(internalFormControlProps, formControlProps);

    const renderInput = (params: AutocompleteRenderInputParams) => (
        // inputProps are additionally processed and set required prop based on currently selected values
        // This allows to allows proper submitting when required = true
        <MultiselectRenderInput
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

    const internalAutocompleteProps: MultiselectAutocompleteProps = {
        renderInput,
        options,
        value: [],
        multiple: true,
        loadingText: t("placeholder.loading"),
        noOptionsText: t("placeholder.selectMultipleEmpty"),
        disableCloseOnSelect: true,
        getOptionLabel: (option: string | OptionInterface) => {
            const label = typeof option === "string" ? option : option.representation;
            return disableTranslateOption ? label : t(label);
        },
        disabled,
        onChange: callableOnChange,
        renderOption: (props, option, { selected }) => (
            <li {...props}>
                <MuiCheckbox
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

export default Multiselect;
export { MultiselectProps, MultiselectSpecificProps, MultiselectRenderInput, MultiselectRenderInputProps };
