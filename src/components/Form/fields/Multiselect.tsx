import React from "react";
import * as Yup from "yup";
import { useForm } from "../../../components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import MultiselectElement, {
    MultiselectElementSpecificProps,
} from "../../../components/Form/elements/MultiselectElement";
import TextFieldPlaceholderInterface from "../../../components/Form/definitions/TextFieldPlaceholderInterface";

type MultiselectProps = MultiselectElementSpecificProps & TextFieldPlaceholderInterface;

const Multiselect = ({
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
    ...elementSpecificProps
}: MultiselectProps) => {
    if (typeof name === "undefined") {
        throw new Error("Multiselect component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, resolveValidationSchema, getError, getLabel, getPlaceholder, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);

    const updateValidationSchema = () => {
        let defaultValidationSchema = Yup.array();

        if (resolvedRequired) {
            defaultValidationSchema = defaultValidationSchema
                .min(1, "validation.required")
                .required("validation.required");
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
        <MultiselectElement
            {...{
                name,
                path: resolvedPath,
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

export default Multiselect;
export { MultiselectProps };
