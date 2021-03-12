import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { resolveBooleanOrFunction, resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import UploadElement, {
    UploadElementProps,
    UploadElementSpecificProps,
} from "@arteneo/forge/components/Form/elements/UploadElement";
import TextFieldInterface from "@arteneo/forge/components/Form/definitions/TextFieldInterface";
import { AutocompleteChangeReason, AutocompleteChangeDetails } from "@material-ui/lab";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";
import { SelectValueType } from "@arteneo/forge/components/Form/definitions/AutocompleteTypes";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "@arteneo/forge/contexts/HandleCatch";
import { FormControlProps } from "@material-ui/core";
import TextFieldPlaceholderInterface from "@arteneo/forge/components/Form/definitions/TextFieldPlaceholderInterface";

type UploadProps = UploadElementSpecificProps & TextFieldPlaceholderInterface;

// type UploadProps = UploadElementSpecificPropsTextElementSpecificProps & TextFieldPlaceholderInterface;
// interface UploadProps extends UploadElementSpecificProps {
//     // endpoint: string | ((values: FormikValues) => string);
//     // onChange?: (
//     //     name: string,
//     //     // eslint-disable-next-line
//     //     setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
//     //     value: SelectValueType,
//     //     onChange: () => void,
//     //     values: FormikValues,
//     //     // eslint-disable-next-line
//     //     event: React.ChangeEvent<{}>,
//     //     reason: AutocompleteChangeReason,
//     //     details?: AutocompleteChangeDetails<OptionInterface>
//     // ) => void;
//     // groupBy?: (option: OptionInterface) => string;
//     // // eslint-disable-next-line
//     // loadUseEffectDependency?: any;
//     // disableTranslateGroupBy?: boolean;
//     // autocompleteProps?: SelectAutocompleteOptionalProps;
//     // formControlProps?: FormControlProps;
// }

const Upload = ({
    name,
    path,
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
    authenticationService,
}: // groupBy,
// loadUseEffectDependency,
// disableTranslateGroupBy,
// autocompleteProps,
// formControlProps,
UploadProps) => {
    if (typeof name === "undefined") {
        throw new Error("Text component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, resolveValidationSchema, getError, getLabel, getPlaceholder, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;

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

    return (
        <UploadElement
            {...{
                name,
                authenticationService,
                // options,
                path: resolvedPath,
                label: resolvedLabel,
                placeholder: resolvedPlaceholder,
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
