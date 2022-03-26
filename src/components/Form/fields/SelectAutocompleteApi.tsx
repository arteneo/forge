import React from "react";
import * as Yup from "yup";
import { useForm } from "../../../components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { resolveBooleanOrFunction, resolveStringOrFunction } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import SelectElement, {
    SelectElementSpecificProps,
    SelectElementRenderInput,
} from "../../../components/Form/elements/SelectElement";
import TextFieldPlaceholderInterface from "../../../components/Form/definitions/TextFieldPlaceholderInterface";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import OptionInterface from "../../../components/Form/definitions/OptionInterface";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";
import { debounce } from "lodash";
import {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteRenderInputParams,
    AutocompleteRenderOptionState,
} from "@mui/material";
import { SelectValueType } from "../../../components/Form/definitions/AutocompleteTypes";
import Highlighter from "react-highlight-words";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface SelectAutocompleteApiInternalProps {
    endpoint: undefined | string | ((values: FormikValues) => undefined | string);
    // eslint-disable-next-line
    getEndpointData?: (inputValue: string, value: string, values: FormikValues) => any;
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        onChange: () => void,
        setInputValue: React.Dispatch<React.SetStateAction<string>>,
        setSkipLoading: (skipLoading: boolean) => void,
        values: FormikValues,
        // eslint-disable-next-line
        event: React.ChangeEvent<{}>,
        reason: AutocompleteChangeReason,
        name: string,
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => void;
    renderOption?: (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: OptionInterface,
        state: AutocompleteRenderOptionState
    ) => React.ReactNode;
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type SelectAutocompleteApiProps = SelectAutocompleteApiInternalProps &
    Omit<SelectElementSpecificProps, "options" | "onChange"> &
    TextFieldPlaceholderInterface;

interface LoadInterface {
    endpoint: string;
    // eslint-disable-next-line
    data: any;
}

type LoadCancelType = undefined | (() => void);

const useStyles = makeStyles((theme) => ({
    highlight: {
        fontWeight: 700,
        backgroundColor: "transparent",
        color: "red", // TODO theme.palette.primary.main,
    },
}));

// Skip loading is used to hide loader when user selects a new value.
// Loading request is still done, but used does not need to see that
let _skipLoading = false;
const setSkipLoading = (skipLoading: boolean) => {
    _skipLoading = skipLoading;
};

const SelectAutocompleteApi = ({
    name,
    path,
    endpoint,
    getEndpointData = (inputValue: string, value?: string) => {
        return {
            inputValue,
            value,
        };
    },
    label,
    placeholder,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    enableAutoPlaceholder = false,
    disableTranslatePlaceholder = false,
    help,
    disableTranslateHelp = false,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema,
    loadUseEffectDependency,
    disableTranslateOption = true,
    onChange,
    renderOption,
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

    // Input value represents string visible in TextField (search input)
    const [inputValue, setInputValue] = React.useState("");
    // Loading additionally shows CircularProgress icon in input endAdornment
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState<OptionsType>([]);

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;
    const resolvedEndpoint = endpoint ? resolveStringOrFunction(endpoint, values, inputValue) : undefined;

    const value = getIn(values, resolvedPath, undefined);

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

    // Variables stores cancel token for axios to be used when component is unmounting
    let debauncedLoadCancel: LoadCancelType = undefined;

    const debouncedLoad = React.useMemo(
        () =>
            debounce(({ endpoint, data }: LoadInterface, callback: (results: OptionsType) => void) => {
                const axiosSource = axios.CancelToken.source();

                axios
                    .post(endpoint, data, { cancelToken: axiosSource.token })
                    .then((response: AxiosResponse) => {
                        callback(response.data);
                    })
                    .catch((error: AxiosError) => {
                        handleCatch(error);
                    });

                debauncedLoadCancel = () => {
                    axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
                };
            }, 250),
        []
    );

    React.useEffect(() => initialize(), [value, inputValue]);
    // * Not ideal:
    // In case of triggering loadUseEffectDependency externally
    // it is assumed that value has changed and inputValue should be always updated (refreshed based first loaded option assuming empty inputValue)
    React.useEffect(() => initialize(true), [loadUseEffectDependency]);

    const initialize = (forceUpdateInputValue = false) => {
        if (!inputValue && !value) {
            setOptions([]);
            return;
        }

        if (typeof resolvedEndpoint === "undefined") {
            return;
        }

        if (!_skipLoading) {
            setLoading(true);
        }

        const processedInputValue = forceUpdateInputValue ? "" : inputValue;

        debouncedLoad(
            { endpoint: resolvedEndpoint, data: getEndpointData(processedInputValue, value, values) },
            (options) => {
                setLoading(false);
                setOptions(options);

                if (options.length > 0 && !processedInputValue) {
                    setInputValue(options[0].representation);
                }
            }
        );

        setSkipLoading(false);
    };

    React.useEffect(() => {
        return () => {
            if (typeof debauncedLoadCancel !== "undefined") {
                debauncedLoadCancel();
            }
        };
    }, [debouncedLoad]);

    if (resolvedHidden || !isReady(resolvedPath)) {
        return null;
    }

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(resolvedPath, touched, errors, submitCount);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);
    const resolvedPlaceholder = getPlaceholder(
        placeholder,
        values,
        touched,
        errors,
        name,
        enableAutoPlaceholder,
        disableTranslatePlaceholder
    );

    const defaultOnChange = (value: SelectValueType, selectElementOnChange: () => void) => {
        selectElementOnChange();

        if (value === null || Array.isArray(value) || typeof value === "string") {
            return;
        }

        setSkipLoading(true);
        setInputValue(value.representation);
    };

    const callableOnChange = (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        selectElementOnChange: () => void,
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
                () => defaultOnChange(value, selectElementOnChange),
                setInputValue,
                setSkipLoading,
                values,
                event,
                reason,
                name,
                details
            );
            return;
        }

        defaultOnChange(value, selectElementOnChange);
    };

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <SelectElementRenderInput
            {...{
                label: resolvedLabel,
                required: resolvedRequired,
                placeholder: resolvedPlaceholder,
                error: resolvedError ? true : false,
                ...params,
                inputProps: {
                    ...params.inputProps,
                    autoComplete: "off",
                },
                InputProps: {
                    ...params.InputProps,
                    endAdornment: (
                        <>
                            {loading && <CircularProgress {...{ color: "inherit", size: 20 }} />}
                            {params.InputProps.endAdornment}
                        </>
                    ),
                },
            }}
        />
    );

    const defaultRenderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: OptionInterface) => (
        <Highlighter
            {...{
                highlightClassName: classes.highlight,
                searchWords: [inputValue],
                autoEscape: true,
                textToHighlight: option.representation,
            }}
        />
    );

    const callableRenderOption = (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: OptionInterface,
        state: AutocompleteRenderOptionState
    ) => {
        if (renderOption) {
            return renderOption(props, option, state);
        }

        return defaultRenderOption(props, option);
    };

    return (
        <SelectElement
            {...{
                name,
                path: resolvedPath,
                options,
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
                    loading,
                    filterOptions: (option) => option,
                    getOptionLabel: () => inputValue,
                    inputValue,
                    renderInput,
                    onInputChange: (event, value, reason) => {
                        // Reason "reset" means programmatic change
                        // This prevents clearing input when changing inputValue when there is a selected option
                        // Not sure why this works that way
                        if (reason !== "reset") {
                            setFieldValue(resolvedPath, "");
                            setInputValue(value);
                        }
                    },
                    renderOption: callableRenderOption,
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
