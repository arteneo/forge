import React from "react";
import * as Yup from "yup";
import { useForm } from "../../../components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { resolveBooleanOrFunction, resolveStringOrFunction } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import MultiselectElement, {
    MultiselectElementSpecificProps,
    MultiselectElementRenderInput,
} from "../../../components/Form/elements/MultiselectElement";
import TextFieldPlaceholderInterface from "../../../components/Form/definitions/TextFieldPlaceholderInterface";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import OptionInterface from "../../../components/Form/definitions/OptionInterface";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";
import { debounce } from "lodash";
import {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteRenderGetTagProps,
    AutocompleteRenderInputParams,
    AutocompleteRenderOptionState,
    Box,
    Chip,
} from "@mui/material";
import { SelectValueType } from "../../../components/Form/definitions/AutocompleteTypes";
import Highlighter from "react-highlight-words";
import { CircularProgress } from "@mui/material";

interface MultiselectAutocompleteApiInternalProps {
    endpoint: undefined | string | ((values: FormikValues) => undefined | string);
    // eslint-disable-next-line
    getEndpointData?: (inputValue: string, value: OptionsType, values: FormikValues) => any;
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
    modifyOptions?: (options: OptionsType) => OptionsType;
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type MultiselectAutocompleteApiProps = MultiselectAutocompleteApiInternalProps &
    Omit<MultiselectElementSpecificProps, "options" | "onChange"> &
    TextFieldPlaceholderInterface;

interface LoadInterface {
    endpoint: string;
    // eslint-disable-next-line
    data: any;
}

type LoadCancelType = undefined | (() => void);

// Skip loading is used to hide loader when user selects a new value.
// Loading request is still done, but used does not need to see that
let _skipLoading = false;
const setSkipLoading = (skipLoading: boolean) => {
    _skipLoading = skipLoading;
};

/**
 * ! Not tested with initial values (probably will not work)
 */
const MultiselectAutocompleteApi = ({
    name,
    path,
    endpoint,
    getEndpointData = (inputValue: string, value: OptionsType) => {
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
    modifyOptions,
    loadUseEffectDependency,
    disableTranslateOption = true,
    onChange,
    renderOption,
    ...elementSpecificProps
}: MultiselectAutocompleteApiProps) => {
    if (typeof name === "undefined") {
        throw new Error(
            "MultiselectAutocompleteApi component: name is required prop. By default it is injected by FormContent."
        );
    }

    const { getError, getLabel, getPlaceholder, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();
    const handleCatch = useHandleCatch();

    // Input value represents string visible in TextField (search input)
    const [inputValue, setInputValue] = React.useState("");
    // Loading additionally shows CircularProgress icon in input endAdornment
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState<OptionsType>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<OptionsType>([]);

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;
    const resolvedEndpoint = endpoint ? resolveStringOrFunction(endpoint, values, inputValue) : undefined;

    const value: OptionsType = getIn(values, resolvedPath, []);

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);

    const updateValidationSchema = () => {
        let defaultValidationSchema = Yup.array();

        if (resolvedRequired) {
            defaultValidationSchema = defaultValidationSchema
                .min(1, "validation.required")
                .required("validation.required");
        }

        // TODO
        // resolveValidationSchema(
        //     resolvedPath,
        //     validationSchema,
        //     defaultValidationSchema,
        //     resolvedHidden,
        //     resolvedRequired,
        //     values,
        //     touched,
        //     errors,
        //     name
        // );
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

    // Load options in case of:
    // - inputValue change
    // - resolvedEndpoint change
    // - loadUseEffectDependency change (used to force options reload externally)
    React.useEffect(() => loadOptions(), [inputValue, resolvedEndpoint, loadUseEffectDependency]);

    const loadOptions = () => {
        if (typeof resolvedEndpoint === "undefined") {
            setOptions([]);
            return;
        }

        if (!_skipLoading) {
            setLoading(true);
        }

        debouncedLoad({ endpoint: resolvedEndpoint, data: getEndpointData(inputValue, value, values) }, (options) => {
            setLoading(false);

            const processedOptions = modifyOptions ? modifyOptions(options) : options;
            selectedOptions.forEach((option) => {
                const processedOptionExist = processedOptions.find(
                    (processedOption) => processedOption.id === option.id
                );
                if (!processedOptionExist) {
                    processedOptions.push(option);
                }
            });

            setOptions(processedOptions);
        });

        setSkipLoading(false);
    };

    React.useEffect(() => {
        return () => {
            if (typeof debauncedLoadCancel !== "undefined") {
                debauncedLoadCancel();
            }
        };
    }, [debouncedLoad]);

    if (resolvedHidden) {
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

    const defaultOnChange = (value: SelectValueType, multiselectElementOnChange: () => void) => {
        multiselectElementOnChange();

        if (!Array.isArray(value)) {
            return;
        }

        setSkipLoading(true);
        setSelectedOptions(value as OptionsType);
    };

    const callableOnChange = (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        multiselectElementOnChange: () => void,
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
                () => defaultOnChange(value, multiselectElementOnChange),
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

        defaultOnChange(value, multiselectElementOnChange);
    };

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <MultiselectElementRenderInput
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
        <li {...props}>
            <Highlighter
                {...{
                    highlightTag: ({ children }) => (
                        <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
                            {children}
                        </Box>
                    ),
                    searchWords: [inputValue],
                    autoEscape: true,
                    textToHighlight: option.representation,
                }}
            />
        </li>
    );

    const callableRenderOption = (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: OptionInterface,
        state: AutocompleteRenderOptionState
    ) => {
        return (
            <React.Fragment key={option.id}>
                {renderOption ? renderOption(props, option, state) : defaultRenderOption(props, option)}
            </React.Fragment>
        );
    };

    const renderTags = (value: OptionInterface[], getTagProps: AutocompleteRenderGetTagProps) => {
        return (
            <>
                {value.map((option, index) => (
                    <Chip {...{ label: option.representation, ...getTagProps({ index }) }} key={index} />
                ))}
            </>
        );
    };

    return (
        <MultiselectElement
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
                    filterSelectedOptions: true,
                    renderInput,
                    renderTags,
                    onInputChange: (event, value, reason) => {
                        // Reason "reset" means programmatic change
                        // This prevents clearing input when changing inputValue when there is a selected option
                        // Not sure why this works that way
                        if (reason !== "reset") {
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

MultiselectAutocompleteApi.defaultProps = {
    // eslint-disable-next-line
    transformInitialValue: (value: any) => {
        // Backend API is serializing it as object
        if (Array.isArray(value)) {
            return value.map((valueOption) => {
                // Backend API is serializing it as object
                if (typeof valueOption?.id !== "undefined") {
                    return valueOption.id;
                }

                return valueOption;
            });
        }

        return value;
    },
};

export default MultiselectAutocompleteApi;
export { MultiselectAutocompleteApiProps };
