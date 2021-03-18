import React, { ReactNode } from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { resolveBooleanOrFunction, resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import SelectElement, { SelectElementSpecificProps } from "@arteneo/forge/components/Form/elements/SelectElement";
import TextFieldPlaceholderInterface from "@arteneo/forge/components/Form/definitions/TextFieldPlaceholderInterface";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { throttle } from "lodash";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import { AutocompleteChangeDetails, AutocompleteChangeReason } from "@material-ui/lab";
import { SelectValueType } from "@arteneo/forge/components/Form/definitions/AutocompleteTypes";
import FieldPlaceholderType from "@arteneo/forge/components/Form/definitions/FieldPlaceholderType";
import Highlighter from "react-highlight-words";
import { makeStyles } from "@material-ui/core";

interface SelectAutocompleteApiInternalProps {
    endpoint: undefined | string | ((values: FormikValues) => undefined | string);
    // eslint-disable-next-line
    getAutocompleteData?: (inputValue: string, values: FormikValues) => any;
    // eslint-disable-next-line
    renderOption?: (inputValue: string, option: OptionInterface, state: any) => ReactNode;
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
    loadingText?: FieldPlaceholderType;
    noOptionsText?: FieldPlaceholderType;
}

type SelectAutocompleteApiProps = SelectAutocompleteApiInternalProps &
    Omit<SelectElementSpecificProps, "options"> &
    TextFieldPlaceholderInterface;

const useStyles = makeStyles((theme) => ({
    highlight: {
        fontWeight: 700,
        backgroundColor: "transparent",
        color: theme.palette.primary.main,
    },
}));

const SelectAutocompleteApi = ({
    name,
    path,
    endpoint,
    label,
    placeholder,
    loadingText = "loading",
    noOptionsText = "selectAutocompleteEmpty",
    disableAutoLabel = false,
    disableTranslateLabel = false,
    enableAutoPlaceholder = false,
    disableTranslatePlaceholder = false,
    help,
    onChange,
    getAutocompleteData = (inputValue: string) => {
        phrase: inputValue;
    },
    renderOption,
    disableTranslateHelp = false,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema,
    disableTranslateOption = true,
    ...elementSpecificProps
}: SelectAutocompleteApiProps) => {
    if (typeof name === "undefined") {
        throw new Error("Text component: name is required prop. By default it is injected by FormContent.");
    }
    const classes = useStyles();
    const { isReady, resolveValidationSchema, getError, getLabel, getPlaceholder, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    const [inputValue, setInputValue] = React.useState("");

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;
    const resolvedEndpoint = endpoint ? resolveStringOrFunction(endpoint, values, inputValue) : undefined;

    // eslint-disable-next-line
    const [value, setValue] = React.useState<any>(null);
    const [options, setOptions] = React.useState<OptionsType>([]);

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);

    const updateValidationSchema = () => {
        let defaultValidationSchema = Yup.string();

        if (resolvedRequired) {
            defaultValidationSchema = defaultValidationSchema.required("validation.required");
        }

        resolveValidationSchema(
            resolvedPath,
            validationSchema,
            defaultValidationSchema,
            resolvedHidden,
            resolvedRequired,
            values,
            touched,
            errors,
            name
        );
    };

    const fetch = React.useMemo(
        () =>
            throttle((inputValue: string, callback: (results: OptionsType) => void) => {
                if (resolvedEndpoint) {
                    showLoader();
                    axios
                        .post(resolvedEndpoint, getAutocompleteData(inputValue, values))
                        .then((response: AxiosResponse) => {
                            callback(response.data);
                            hideLoader();
                        })
                        .catch((error: AxiosError) => {
                            handleCatch(error);
                            hideLoader();
                        });
                }
            }, 250),
        [resolvedEndpoint, values]
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === "") {
            setOptions([]);
            return undefined;
        }
        fetch(inputValue, (results: OptionsType) => {
            if (active) {
                let newOptions: OptionsType = [];

                if (value !== null) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    if (resolvedHidden || !isReady(resolvedPath)) {
        return null;
    }

    const defaultOnChange = (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        onChangeSelectElement: () => void
    ) => {
        setValue(value);
        onChangeSelectElement();
    };

    const callableOnChange = (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        onChangeSelectElement: () => void,
        values: FormikValues,
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        reason: AutocompleteChangeReason,
        name: string,
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => {
        if (onChange) {
            // Parameters are swapped for convenience
            onChange(
                path,
                setFieldValue,
                value,
                () => defaultOnChange(path, setFieldValue, value, onChangeSelectElement),
                values,
                event,
                reason,
                name,
                details
            );
            return;
        }

        defaultOnChange(path, setFieldValue, value, onChangeSelectElement);
    };

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(resolvedPath, touched, errors, submitCount);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);
    const resolvedLoadingText = getPlaceholder(
        loadingText,
        values,
        touched,
        errors,
        name,
        false,
        disableTranslatePlaceholder
    );
    const resolvedNoOptionsText = getPlaceholder(
        noOptionsText,
        values,
        touched,
        errors,
        name,
        false,
        disableTranslatePlaceholder
    );
    const resolvedPlaceholder = getPlaceholder(
        placeholder,
        values,
        touched,
        errors,
        name,
        enableAutoPlaceholder,
        disableTranslatePlaceholder
    );

    const defaultRenderOption = (inputValue: string, option: OptionInterface) => (
        <Highlighter
            highlightClassName={classes.highlight}
            searchWords={[inputValue]}
            textToHighlight={getOptionLabel(option)}
        />
    );

    const getOptionLabel = (option: OptionInterface) => {
        if (typeof option === "string") {
            return option;
        }

        return option?.representation ?? "";
    };
    return (
        <SelectElement
            {...{
                name,
                path: resolvedPath,
                options,
                autocompleteProps: {
                    autoComplete: true,
                    filterSelectedOptions: true,
                    autoHighlight: true,
                    loadingText: resolvedLoadingText,
                    noOptionsText: resolvedNoOptionsText,
                    onInputChange: (event, newInputValue) => {
                        setInputValue(newInputValue);
                    },
                    getOptionLabel: getOptionLabel,
                    value: value,
                    renderOption: (option, state) =>
                        renderOption
                            ? renderOption(inputValue, option, state)
                            : defaultRenderOption(inputValue, option),
                },
                disableTranslateOption,
                label: resolvedLabel,
                placeholder: resolvedPlaceholder,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                onChange: callableOnChange,
                ...elementSpecificProps,
            }}
        />
    );
};

SelectAutocompleteApi.defaultProps = {
    // eslint-disable-next-line
    transformInitialValue: (value: any) => {
        // Backend API is serializing it as object
        if (typeof value?.id !== "undefined") {
            return value.id;
        }

        return value;
    },
};

export default SelectAutocompleteApi;
export { SelectAutocompleteApiProps };
