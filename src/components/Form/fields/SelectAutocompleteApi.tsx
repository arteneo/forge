import React from "react";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { debounce } from "lodash";
import {
    AutocompleteChangeReason,
    AutocompleteChangeDetails,
    AutocompleteRenderOptionState,
    CircularProgress,
} from "@mui/material";
import Highlighter from "react-highlight-words";
import { resolveFieldAutocompleteEndpoint } from "../../../utilities/resolve";
import Select, {
    SelectProps,
    SelectElementRenderInput,
    SelectElementRenderInputProps,
} from "../../../components/Form/fields/Select";
import { useForm } from "../../../components/Form/contexts/Form";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import OptionInterface from "../../../components/Form/definitions/OptionInterface";
import FieldAutocompleteEndpointType from "../../../components/Form/definitions/FieldAutocompleteEndpointType";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";
import { SelectValueType } from "../../../components/Form/definitions/AutocompleteTypes";
import HighlightTag from "../../../components/Common/HighlightTag";

interface SelectAutocompleteApiSpecificProps {
    endpoint: FieldAutocompleteEndpointType;
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        onChange: () => void,
        setInputValue: React.Dispatch<React.SetStateAction<string>>,
        setSelectedOption: React.Dispatch<React.SetStateAction<undefined | OptionInterface>>,
        setSkipLoading: (skipLoading: boolean) => void,
        values: FormikValues,
        event: React.SyntheticEvent,
        reason: AutocompleteChangeReason,
        name: string,
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => void;
    processResponse?: (response: AxiosResponse) => OptionsType;
    getInitialSelectedOption?: (
        path: string,
        initialValues?: FormikValues,
        initializedValuesResponse?: AxiosResponse
    ) => undefined | OptionInterface;
    getOptionRepresentation?: (option: OptionInterface) => string;
    renderOption: (
        inputValue: string,
        props: React.HTMLAttributes<HTMLLIElement>,
        option: OptionInterface,
        state: AutocompleteRenderOptionState
    ) => React.ReactNode;
    renderInput?: (params: SelectAutocompleteApiElementRenderInputProps) => React.ReactNode;
    // Used to reload options on demand
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type SelectAutocompleteApiProps = SelectAutocompleteApiSpecificProps & Omit<SelectProps, "options" | "onChange">;

interface SelectAutocompleteApiElementRenderInputProps extends SelectElementRenderInputProps {
    loading: boolean;
}

type LoadCancelType = undefined | (() => void);

// Skip loading is used to hide loader when user selects a new value.
// Loading request is still done, but used does not need to see that
let _skipLoading = false;
const setSkipLoading = (skipLoading: boolean) => {
    _skipLoading = skipLoading;
};

const SelectAutocompleteApi = ({
    endpoint,
    onChange,
    processResponse = (response) => response.data,
    loadUseEffectDependency,
    disableTranslateOption = true,
    getInitialSelectedOption = (path, initialValues, initializedValuesResponse) => {
        const selectedOption: undefined | OptionInterface = getIn(initializedValuesResponse?.data, path, undefined);

        if (typeof selectedOption !== "undefined") {
            return selectedOption;
        }

        return getIn(initialValues, path, undefined);
    },
    getOptionRepresentation = (option: OptionInterface) => option.representation,
    renderOption,
    renderInput,
    ...selectProps
}: SelectAutocompleteApiProps) => {
    const handleCatch = useHandleCatch();
    const { values }: FormikProps<FormikValues> = useFormikContext();
    const { initialValues, initializedValuesResponse } = useForm();

    if (typeof selectProps.name === "undefined") {
        throw new Error("SelectAutocompleteApi: Missing name prop. By default it is injected while rendering.");
    }

    const path = selectProps.path ? selectProps.path : selectProps.name;
    const value = getIn(values, path, undefined);
    const initialSelectedOption = getInitialSelectedOption(path, initialValues, initializedValuesResponse);
    const initialInputValue =
        typeof initialSelectedOption !== "undefined" ? getOptionRepresentation(initialSelectedOption) : "";

    // Input value represents string visible in TextField (search input)
    const [inputValue, setInputValue] = React.useState(initialInputValue);
    // Loading additionally shows CircularProgress icon in input endAdornment
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState<OptionsType>([]);
    const [selectedOption, setSelectedOption] = React.useState<undefined | OptionInterface>(initialSelectedOption);

    const requestConfig = resolveFieldAutocompleteEndpoint(endpoint, inputValue, values);

    // requestConfig should depend on inputValue that is why it is skipped in dependencies
    useDeepCompareEffectNoCheck(() => load(), [requestConfig, loadUseEffectDependency]);

    // Variables stores cancel token for axios to be used when component is unmounting
    let debauncedLoadCancel: LoadCancelType = undefined;

    const debouncedLoad = React.useMemo(
        () =>
            debounce((requestConfig: AxiosRequestConfig, callback: (results: OptionsType) => void) => {
                const axiosSource = axios.CancelToken.source();
                // requestConfig needs to be copied to avoid firing useDeepCompareEffectNoCheck
                const axiosRequestConfig = Object.assign({ cancelToken: axiosSource.token }, requestConfig);
                axiosRequestConfig.cancelToken = axiosSource.token;

                axios
                    .request(requestConfig)
                    .then((response: AxiosResponse) => {
                        callback(processResponse(response));
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

    const load = () => {
        if (!inputValue || typeof requestConfig === "undefined") {
            setOptions([]);
            return;
        }

        if (_skipLoading) {
            setSkipLoading(false);
            return;
        }

        setLoading(true);

        debouncedLoad(requestConfig, (options) => {
            setLoading(false);
            setOptions(options);
        });
    };

    React.useEffect(() => {
        return () => {
            if (typeof debauncedLoadCancel !== "undefined") {
                debauncedLoadCancel();
            }
        };
    }, [debouncedLoad]);

    const defaultOnChange = (value: SelectValueType, selectElementOnChange: () => void) => {
        selectElementOnChange();

        if (value === null || Array.isArray(value) || typeof value === "string") {
            return;
        }

        setSelectedOption(value);
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
        event: React.SyntheticEvent,
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
                setSelectedOption,
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

    const defaultRenderOption = (
        inputValue: string,
        props: React.HTMLAttributes<HTMLLIElement>,
        option: OptionInterface
    ) => (
        <li {...props}>
            <Highlighter
                {...{
                    highlightTag: HighlightTag,
                    searchWords: [inputValue],
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
        if (renderOption) {
            return renderOption(inputValue, props, option, state);
        }

        return defaultRenderOption(inputValue, props, option);
    };

    const callableRenderInput = (params: SelectElementRenderInputProps) => {
        const renderInputParams: SelectElementRenderInputProps = {
            ...params,
            InputProps: {
                ...params.InputProps,
                endAdornment: (
                    <>
                        {loading && <CircularProgress {...{ color: "inherit", size: 20 }} />}
                        {params.InputProps.endAdornment}
                    </>
                ),
            },
        };

        if (renderInput) {
            return renderInput({ loading, ...renderInputParams });
        }

        return <SelectElementRenderInput {...renderInputParams} />;
    };

    return (
        <Select
            {...{
                options,
                disableTranslateOption,
                onChange: callableOnChange,
                renderInput: callableRenderInput,
                ...selectProps,
                autocompleteProps: {
                    // freeSolo: true,
                    inputValue,
                    filterOptions: (option) => option,
                    onInputChange: (event, value, reason) => {
                        // Reason "reset" means programmatic change
                        // This prevents clearing input when changing inputValue when there is a selected option
                        // Not sure why this works that way
                        if (reason !== "reset") {
                            setInputValue(value);
                        }
                    },
                    onClose: (event: React.SyntheticEvent, reason: string) => {
                        if (reason === "selectOption") {
                            return;
                        }

                        if (typeof value !== "undefined" && typeof selectedOption !== "undefined") {
                            setInputValue(getOptionRepresentation(selectedOption));
                            return;
                        }

                        setInputValue("");
                    },
                    renderOption: callableRenderOption,
                    ...selectProps.autocompleteProps,
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
export { SelectAutocompleteApiProps, SelectAutocompleteApiSpecificProps, SelectAutocompleteApiElementRenderInputProps };
