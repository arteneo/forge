import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { resolveBooleanOrFunction, resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import UploadElement from "@arteneo/forge/components/Form/elements/Upload";
import TextFieldInterface from "@arteneo/forge/components/Form/definitions/TextFieldInterface";
import { AutocompleteChangeReason, AutocompleteChangeDetails } from "@material-ui/lab";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";
import { SelectValueType } from "@arteneo/forge/components/Form/definitions/AutocompleteTypes";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "@arteneo/forge/contexts/HandleCatch";
import { FormControlProps } from "@material-ui/core";

interface UploadProps extends TextFieldInterface {
    // endpoint: string | ((values: FormikValues) => string);
    // onChange?: (
    //     name: string,
    //     // eslint-disable-next-line
    //     setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    //     value: SelectValueType,
    //     onChange: () => void,
    //     values: FormikValues,
    //     // eslint-disable-next-line
    //     event: React.ChangeEvent<{}>,
    //     reason: AutocompleteChangeReason,
    //     details?: AutocompleteChangeDetails<OptionInterface>
    // ) => void;
    // groupBy?: (option: OptionInterface) => string;
    // // eslint-disable-next-line
    // loadUseEffectDependency?: any;
    // disableTranslateGroupBy?: boolean;
    // autocompleteProps?: SelectAutocompleteOptionalProps;
    // formControlProps?: FormControlProps;
}

const Upload = ({
    name,
    // endpoint,
    label,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    help,
    disableTranslateHelp = false,
    // onChange,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema,
    // groupBy,
    // loadUseEffectDependency,
    // disableTranslateGroupBy,
    // autocompleteProps,
    // formControlProps,
}: UploadProps) => {
    if (typeof name === "undefined") {
        throw new Error("Text component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, setValidationSchema, getError, getLabel, getHelp } = useForm();
    const { values, touched, errors }: FormikProps<FormikValues> = useFormikContext();
    // const handleCatch = useHandleCatch();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    // const resolvedEndpoint = resolveStringOrFunction(endpoint, values);

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);

    const updateValidationSchema = () => {
        if (resolvedHidden) {
            setValidationSchema(name, null);
            return;
        }

        if (!validationSchema && resolvedRequired) {
            setValidationSchema(name, Yup.string().required("validation.required"));
            return;
        }

        if (!validationSchema) {
            return;
        }

        if (resolvedRequired) {
            setValidationSchema(name, validationSchema.required("validation.required"));
            return;
        }
    };

    if (resolvedHidden || !isReady(name)) {
        return null;
    }

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(name, touched, errors);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);

    return (
        <UploadElement
            {...{
                name,
                // options,
                disableTranslateOption: true,
                label: resolvedLabel,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                // onChange,
                // groupBy,
                // disableTranslateGroupBy,
                // autocompleteProps,
                // formControlProps,
            }}
        />
    );
};

export default Upload;
export { UploadProps };
