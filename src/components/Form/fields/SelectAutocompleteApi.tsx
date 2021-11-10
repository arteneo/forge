import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { resolveBooleanOrFunction, resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import SelectElement, { SelectElementSpecificProps } from "@arteneo/forge/components/Form/elements/SelectElement";
import TextFieldPlaceholderInterface from "@arteneo/forge/components/Form/definitions/TextFieldPlaceholderInterface";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { debounce } from "lodash";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import { AutocompleteChangeDetails, AutocompleteChangeReason } from "@material-ui/lab";
import { SelectValueType } from "@arteneo/forge/components/Form/definitions/AutocompleteTypes";
import FieldPlaceholderType from "@arteneo/forge/components/Form/definitions/FieldPlaceholderType";
import Highlighter from "react-highlight-words";
import { makeStyles } from "@material-ui/core";

interface SelectAutocompleteApiInternalProps {
    initializeEndpoint: (value: string, values: FormikValues) => string;
    endpoint: undefined | string | ((values: FormikValues) => undefined | string);
    // eslint-disable-next-line
    getEndpointData?: (inputValue: string, value: string, values: FormikValues) => any;
    // eslint-disable-next-line
    renderOption?: (inputValue: string, option: OptionInterface, state: any) => React.ReactNode;
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
    getEndpointData = (inputValue: string, value?: string) => {
        return {
            inputValue,
            value,
        };
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
        throw new Error(
            "SelectAutocompleteApi component: name is required prop. By default it is injected by FormContent."
        );
    }

    const classes = useStyles();
    const { isReady, resolveValidationSchema, getError, getLabel, getPlaceholder, getHelp } = useForm();
    const { values, touched, errors, submitCount, setFieldValue }: FormikProps<FormikValues> = useFormikContext();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    // Input value represents string visible in TextField (search input)
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState<OptionsType>([]);

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;
    const resolvedEndpoint = endpoint ? resolveStringOrFunction(endpoint, values, inputValue) : undefined;

    const value = getIn(values, resolvedPath, undefined);

    // TODO Add load dependency

    // eslint-disable-next-line
    // const [value, setValue] = React.useState<any>(null);

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

    // const fetch = React.useMemo(
    //     () =>
    //         throttle(({ inputValue, value }, callback: (results: OptionsType) => void) => {
    //             console.log(inputValue);
    //             console.log(resolvedEndpoint);
    //             if (!inputValue || typeof resolvedEndpoint === "undefined") {
    //                 setOptions([]);
    //                 return;
    //             }

    //             // TODO Loader and catch error
    //             axios
    //                 .post(resolvedEndpoint, getEndpointData(inputValue, value, values))
    //                 .then((response: AxiosResponse) => {
    //                     callback(response.data);
    //                 })
    //                 .catch((error: AxiosError) => {
    //                     handleCatch(error);
    //                 });
    //         }, 250),
    //     [resolvedEndpoint, values]
    // );

    // React.useEffect(() => {
    //     console.log(inputValue);
    //     console.log(resolvedEndpoint);
    //     let active = true;

    //     if (!inputValue || typeof resolvedEndpoint === "undefined") {
    //         setOptions([]);
    //         return undefined;
    //     }

    //     console.log("fetch");
    //     axios
    //         .post(resolvedEndpoint, getEndpointData(inputValue, value, values))
    //         .then((response: AxiosResponse) => {
    //             setOptions(response.data);
    //         })
    //         .catch((error: AxiosError) => {
    //             handleCatch(error);
    //         });

    //     return () => {
    //         active = false;
    //     };
    // }, [value, inputValue]);

    const fetch = React.useMemo(
        () =>
            throttle(({ inputValue, value }, callback: (results: OptionsType) => void) => {
                console.log(inputValue);
                console.log(resolvedEndpoint);
                if (!inputValue || typeof resolvedEndpoint === "undefined") {
                    setOptions([]);
                    return;
                }

                // TODO Loader and catch error
                axios
                    .post(resolvedEndpoint, getEndpointData(inputValue, value, values))
                    .then((response: AxiosResponse) => {
                        callback(response.data);
                    })
                    .catch((error: AxiosError) => {
                        handleCatch(error);
                    });
            }, 250),
        [resolvedEndpoint, values]
    );

    React.useEffect(() => initialize(), [value, inputValue]);

    const initialize = () => {
        console.log('initialize = ', inputValue);
        console.log('initialize = ', value);
        if (!inputValue && !value) {
            setOptions([]);
            return;
        }

        if (typeof resolvedEndpoint === "undefined") {
            return;
        }

        axios
            .post(resolvedEndpoint, getEndpointData(inputValue, value, values))
            .then((response: AxiosResponse) => {
                const options = response.data;

                setOptions(options);

                if (options.length > 0 && !inputValue) {
                    setInputValue(options[0].representation);
                }
            })
            .catch((error: AxiosError) => {
                handleCatch(error);
            });
    };

    if (resolvedHidden || !isReady(resolvedPath)) {
        return null;
    }

    // const defaultOnChange = (
    //     path: string,
    //     // eslint-disable-next-line
    //     setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    //     value: SelectValueType,
    //     onChangeSelectElement: () => void
    // ) => {
    //     setValue(value);
    //     onChangeSelectElement();
    // };

    // const callableOnChange = (
    //     path: string,
    //     // eslint-disable-next-line
    //     setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    //     value: SelectValueType,
    //     onChangeSelectElement: () => void,
    //     values: FormikValues,
    //     // eslint-disable-next-line
    //     event: React.ChangeEvent<{}>,
    //     reason: AutocompleteChangeReason,
    //     name: string,
    //     details?: AutocompleteChangeDetails<OptionInterface>
    // ) => {
    //     if (onChange) {
    //         // Parameters are swapped for convenience
    //         onChange(
    //             path,
    //             setFieldValue,
    //             value,
    //             () => defaultOnChange(path, setFieldValue, value, onChangeSelectElement),
    //             values,
    //             event,
    //             reason,
    //             name,
    //             details
    //         );
    //         return;
    //     }

    //     defaultOnChange(path, setFieldValue, value, onChangeSelectElement);
    // };

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
        return inputValue;
        if (typeof option === "string") {
            return option;
        }

        return option?.representation ?? "";
    };

    // const defaultOnChange = (
    //     path: string,
    //     // eslint-disable-next-line
    //     setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    //     value: SelectValueType,
    //     onChangeSelectElement: () => void
    // ) => {
    //     setValue(value);
    //     onChangeSelectElement();
    // };

    const callableOnChange = (
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
    ) => {
        console.log("callableOnChange = ", value);
        onChange();

        if (value === null || Array.isArray(value) || typeof value === "string") {
            return;
        }

        setInputValue(value.representation);
    };

    console.log("inputValue = ", inputValue);

    return (
        <SelectElement
            {...{
                name,
                path: resolvedPath,
                options,
                // autocompleteProps: {
                //     autoComplete: true,
                //     filterSelectedOptions: true,
                //     loadingText: resolvedLoadingText,
                //     noOptionsText: resolvedNoOptionsText,
                //     onInputChange: (event, newInputValue) => {
                //         setInputValue(newInputValue);
                //     },
                //     getOptionLabel: getOptionLabel,
                //     value: value,
                //     renderOption: (option, state) =>
                //         renderOption
                //             ? renderOption(inputValue, option, state)
                //             : defaultRenderOption(inputValue, option),
                // },
                disableTranslateOption,
                label: resolvedLabel,
                placeholder: resolvedPlaceholder,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                onChange: callableOnChange,
                ...elementSpecificProps,
                autocompleteProps: {
                    freeSolo: true,
                    clearOnBlur: false,
                    filterOptions: (option) => option,
                    getOptionLabel,
                    inputValue,
                    onInputChange: (event, value, reason) => {
                        console.log("onInputChange v = ", value);
                        console.log("onInputChange e = ", event);
                        console.log("onInputChange r = ", reason);
                        if (reason !== "reset") {
                            setFieldValue(resolvedPath, "");
                            setInputValue(value);
                        }
                    },
                    ...(elementSpecificProps?.autocompleteProps ?? {}),
                },
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
