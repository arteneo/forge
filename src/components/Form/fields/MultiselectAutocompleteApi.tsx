import React from "react";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { debounce, cloneDeep } from "lodash";
import {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteRenderOptionState,
    Checkbox as MuiCheckbox,
    CircularProgress,
} from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import Highlighter from "react-highlight-words";
import { resolveFieldAutocompleteEndpoint } from "../../../utilities/resolve";
import Multiselect, {
    MultiselectProps,
    MultiselectRenderInput,
    MultiselectRenderInputProps,
} from "../../../components/Form/fields/Multiselect";
import { useForm } from "../../../components/Form/contexts/Form";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import OptionInterface from "../../../components/Form/definitions/OptionInterface";
import FieldAutocompleteEndpointType from "../../../components/Form/definitions/FieldAutocompleteEndpointType";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";
import { SelectValueType } from "../../../components/Form/definitions/AutocompleteTypes";
import HighlightTag from "../../../components/Common/HighlightTag";

interface MultiselectAutocompleteApiSpecificProps {
    endpoint: FieldAutocompleteEndpointType;
    onChange?: (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        onChange: () => void,
        setInputValue: React.Dispatch<React.SetStateAction<string>>,
        setSelectedOptions: React.Dispatch<React.SetStateAction<undefined | OptionInterface[]>>,
        values: FormikValues,
        event: React.SyntheticEvent,
        reason: AutocompleteChangeReason,
        name: string,
        details?: AutocompleteChangeDetails<OptionInterface>
    ) => void;
    processResponse?: (response: AxiosResponse) => OptionsType;
    getInitialSelectedOptions?: (
        path: string,
        initialValues?: FormikValues,
        initializedValuesResponse?: AxiosResponse
    ) => undefined | OptionInterface[];
    renderOption?: (
        inputValue: string,
        props: React.HTMLAttributes<HTMLLIElement>,
        option: OptionInterface,
        state: AutocompleteRenderOptionState
    ) => React.ReactNode;
    renderInput?: (params: MultiselectAutocompleteApiRenderInputProps) => React.ReactNode;
    // Used to reload options on demand
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type MultiselectAutocompleteApiProps = MultiselectAutocompleteApiSpecificProps &
    Omit<MultiselectProps, "options" | "onChange">;

interface MultiselectAutocompleteApiRenderInputProps extends MultiselectRenderInputProps {
    loading: boolean;
}

type LoadCancelType = undefined | (() => void);

const MultiselectAutocompleteApi = ({
    endpoint,
    onChange,
    processResponse = (response) => response.data,
    loadUseEffectDependency,
    disableTranslateOption = true,
    getInitialSelectedOptions = (path, initialValues, initializedValuesResponse) => {
        const selectedOptions: undefined | OptionInterface[] = getIn(initializedValuesResponse?.data, path, undefined);

        if (typeof selectedOptions !== "undefined") {
            return selectedOptions;
        }

        return getIn(initialValues, path, undefined);
    },
    renderOption,
    renderInput,
    ...multiselectProps
}: MultiselectAutocompleteApiProps) => {
    const handleCatch = useHandleCatch();
    const { values }: FormikProps<FormikValues> = useFormikContext();
    const { initialValues, initializedValuesResponse } = useForm();

    if (typeof multiselectProps.name === "undefined") {
        throw new Error("MultiselectAutocompleteApi: Missing name prop. By default it is injected while rendering.");
    }

    const path = multiselectProps.path ? multiselectProps.path : multiselectProps.name;
    const initialSelectedOptions = getInitialSelectedOptions(path, initialValues, initializedValuesResponse);

    // Input value represents string visible in TextField (search input)
    const [inputValue, setInputValue] = React.useState("");
    // Loading additionally shows CircularProgress icon in input endAdornment
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState<OptionsType>([]);
    const [selectedOptions, setSelectedOptions] = React.useState<undefined | OptionInterface[]>(initialSelectedOptions);

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

    const defaultOnChange = (value: SelectValueType, multiselectOnChange: () => void) => {
        multiselectOnChange();

        if (!Array.isArray(value)) {
            return;
        }

        setSelectedOptions(value as OptionInterface[]);
    };

    const callableOnChange = (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        value: SelectValueType,
        multiselectOnChange: () => void,
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
                () => defaultOnChange(value, multiselectOnChange),
                setInputValue,
                setSelectedOptions,
                values,
                event,
                reason,
                name,
                details
            );
            return;
        }

        defaultOnChange(value, multiselectOnChange);
    };

    const defaultRenderOption = (
        inputValue: string,
        props: React.HTMLAttributes<HTMLLIElement>,
        option: OptionInterface,
        { selected }: AutocompleteRenderOptionState
    ) => (
        <li {...props}>
            <MuiCheckbox
                {...{
                    icon: <CheckBoxOutlineBlank {...{ fontSize: "small" }} />,
                    checkedIcon: <CheckBox {...{ fontSize: "small" }} />,
                    style: { marginRight: 8 },
                    checked: selected,
                }}
            />
            <Highlighter
                {...{
                    highlightTag: HighlightTag,
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
        if (renderOption) {
            return renderOption(inputValue, props, option, state);
        }

        return defaultRenderOption(inputValue, props, option, state);
    };

    const callableRenderInput = (params: MultiselectRenderInputProps) => {
        const renderInputParams: MultiselectRenderInputProps = {
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

        return <MultiselectRenderInput {...renderInputParams} />;
    };

    const selectedOptionsIds =
        typeof selectedOptions !== "undefined" ? selectedOptions.map((selectedOption) => selectedOption.id) : [];
    const optionsIds = options.map((option) => option.id);

    const allOptions: OptionInterface[] = cloneDeep(selectedOptions) ?? [];
    options?.forEach((option) => {
        if (!selectedOptionsIds.includes(option.id)) {
            allOptions.push(option);
        }
    });

    return (
        <Multiselect
            {...{
                // All options should be passed for proper rendering of tags
                options: allOptions,
                disableTranslateOption,
                onChange: callableOnChange,
                renderInput: callableRenderInput,
                ...multiselectProps,
                autocompleteProps: {
                    inputValue,
                    filterOptions: (option) => {
                        // Show only options that has been loaded. Sort them always according to the order in which has been loaded
                        // eslint-disable-next-line
                        const optionsByIds: any = {};
                        Object.entries(optionsIds).forEach(([key, value]) => {
                            optionsByIds[value] = Number(key);
                        });
                        return option
                            .filter((singleOption) => optionsIds.includes(singleOption.id))
                            .sort((optionA, optionB) => optionsByIds[optionA.id] - optionsByIds[optionB.id]);
                    },
                    onInputChange: (event, value, reason) => {
                        // Reason "reset" means programmatic change
                        // This prevents clearing input when changing inputValue when there is a selected option
                        // Not sure why this works that way
                        if (reason !== "reset") {
                            setInputValue(value);
                        }
                    },
                    renderOption: callableRenderOption,
                    ...multiselectProps.autocompleteProps,
                },
            }}
        />
    );
};

MultiselectAutocompleteApi.defaultProps = {
    // eslint-disable-next-line
    transformInitialValue: (value: any) => {
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
export {
    MultiselectAutocompleteApiProps,
    MultiselectAutocompleteApiSpecificProps,
    MultiselectAutocompleteApiRenderInputProps,
};
