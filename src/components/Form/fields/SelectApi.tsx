import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveUpdatedValidationSchema,
} from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import SelectElement, { SelectAutocompleteOptionalProps } from "@arteneo/forge/components/Form/elements/Select";
import TextFieldInterface from "@arteneo/forge/components/Form/definitions/TextFieldInterface";
import { AutocompleteChangeReason, AutocompleteChangeDetails } from "@material-ui/lab";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";
import { SelectValueType } from "@arteneo/forge/components/Form/definitions/AutocompleteTypes";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "@arteneo/forge/contexts/HandleCatch";
import { FormControlProps } from "@material-ui/core";

interface Props extends TextFieldInterface {
    endpoint: string | ((values: FormikValues) => string | undefined);
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
    groupBy?: (option: OptionInterface) => string;
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
    disableTranslateGroupBy?: boolean;
    disableTranslateOption?: boolean;
    autocompleteProps?: SelectAutocompleteOptionalProps;
    formControlProps?: FormControlProps;
}

const SelectApi: React.FC<Props> = ({
    name,
    endpoint,
    label,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    help,
    disableTranslateHelp = false,
    onChange,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema = Yup.string(),
    groupBy,
    loadUseEffectDependency,
    disableTranslateGroupBy,
    disableTranslateOption = true,
    autocompleteProps,
    formControlProps,
}: Props) => {
    if (typeof name === "undefined") {
        throw new Error("Text component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, setValidationSchema, getError, getLabel, getHelp } = useForm();
    const { values, touched, errors }: FormikProps<FormikValues> = useFormikContext();
    const handleCatch = useHandleCatch();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedEndpoint = resolveStringOrFunction(endpoint, values);

    const [options, setOptions] = React.useState<OptionsType>([]);

    React.useEffect(
        () =>
            setValidationSchema(
                name,
                resolveUpdatedValidationSchema(validationSchema, resolvedHidden, resolvedRequired)
            ),
        [resolvedRequired, resolvedHidden]
    );
    
    React.useEffect(() => load(), [resolvedEndpoint, loadUseEffectDependency]);

    const load = () => {
        if (!resolvedEndpoint || resolvedEndpoint == "") {
            setOptions([]);
            return;
        }
        const axiosSource = axios.CancelToken.source();

        axios
            .get(resolvedEndpoint, {
                cancelToken: axiosSource.token,
            })
            .then((response: AxiosResponse) => {
                setOptions(response.data);
            })
            .catch((error: AxiosError) => {
                handleCatch(error);
            });

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    if (resolvedHidden || !isReady(name)) {
        return null;
    }

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(name, touched, errors);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);

    return (
        <SelectElement
            {...{
                name,
                options,
                disableTranslateOption,
                label: resolvedLabel,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                onChange,
                groupBy,
                disableTranslateGroupBy,
                autocompleteProps,
                formControlProps,
            }}
        />
    );
};

SelectApi.defaultProps = {
    // eslint-disable-next-line
    transformInitialValue: (value: any) => {
        // Backend API is serializing it as object
        if (typeof value?.id !== "undefined") {
            return value.id;
        }

        return value;
    },
};

export default SelectApi;
export { Props };
