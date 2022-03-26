import React from "react";
import * as Yup from "yup";
import { useForm } from "../../../components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { resolveBooleanOrFunction, resolveAxiosRequestConfigOrFunction } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import MultiselectElement, {
    MultiselectElementSpecificProps,
} from "../../../components/Form/elements/MultiselectElement";
import TextFieldPlaceholderInterface from "../../../components/Form/definitions/TextFieldPlaceholderInterface";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";
import useDeepCompareEffect from "use-deep-compare-effect";

interface MultiselectApiInternalProps {
    requestConfig: undefined | AxiosRequestConfig | ((values: FormikValues) => undefined | AxiosRequestConfig);
    modifyOptions?: (options: OptionsType) => OptionsType;
    // eslint-disable-next-line
    loadUseEffectDependency?: any;
}

type MultiselectApiProps = MultiselectApiInternalProps &
    Omit<MultiselectElementSpecificProps, "options"> &
    TextFieldPlaceholderInterface;

const MultiselectApi = ({
    name,
    path,
    requestConfig,
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
    ...elementSpecificProps
}: MultiselectApiProps) => {
    if (typeof name === "undefined") {
        throw new Error("MultiselectApi component: name is required prop. By default it is injected by FormContent.");
    }

    const { getError, getLabel, getPlaceholder, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();
    const handleCatch = useHandleCatch();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;
    const resolvedRequestConfig = requestConfig
        ? resolveAxiosRequestConfigOrFunction(requestConfig, values)
        : undefined;

    const [options, setOptions] = React.useState<OptionsType>([]);

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);
    useDeepCompareEffect(() => load(), [resolvedRequestConfig, loadUseEffectDependency]);

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

    const load = () => {
        if (!requestConfig) {
            setOptions([]);
            return;
        }

        const axiosSource = axios.CancelToken.source();

        axios
            .request(Object.assign({ cancelToken: axiosSource.token }, requestConfig))
            .then((response: AxiosResponse) => {
                const options: OptionsType = response.data;

                if (typeof modifyOptions !== "undefined") {
                    setOptions(modifyOptions(options));
                    return;
                }

                setOptions(options);
            })
            .catch((error: AxiosError) => {
                handleCatch(error);
            });

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

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
                ...elementSpecificProps,
            }}
        />
    );
};

MultiselectApi.defaultProps = {
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

export default MultiselectApi;
export { MultiselectApiProps };
