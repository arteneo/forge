import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import UploadElement, { UploadElementSpecificProps } from "@arteneo/forge/components/Form/elements/UploadElement";
import TextFieldPlaceholderInterface from "@arteneo/forge/components/Form/definitions/TextFieldPlaceholderInterface";
import FieldLabelType from "@arteneo/forge/components/Form/definitions/FieldLabelType";

interface UploadSpecificProps {
    dropDownMainText?: FieldLabelType;
    dropDownSubText?: FieldLabelType;
}

type UploadProps = UploadSpecificProps & UploadElementSpecificProps & TextFieldPlaceholderInterface;

const Upload = ({
    name,
    path,
    label,
    placeholder,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    enableAutoPlaceholder = false,
    disableTranslatePlaceholder = false,
    onUploadComplete,
    help,
    disableTranslateHelp = false,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema,
    authenticationService,
    dropDownMainText,
    dropDownSubText,
    ...elementSpecificProps
}: UploadProps) => {
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
    const resolvedDropDownMainText = getLabel(
        dropDownMainText,
        values,
        touched,
        errors,
        name,
        true,
        disableTranslateLabel
    );
    const resolvedDropDownSubText = getLabel(
        dropDownSubText,
        values,
        touched,
        errors,
        name,
        true,
        disableTranslateLabel
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

    return (
        <UploadElement
            {...{
                name,
                authenticationService,
                path: resolvedPath,
                label: resolvedLabel,
                onUploadComplete,
                dropDownMainText: resolvedDropDownMainText,
                dropDownSubText: resolvedDropDownSubText,
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

export default Upload;
export { UploadProps, UploadSpecificProps };
