import React from "react";
import * as Yup from "yup";
import { useForm } from "../../../components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import RatingElement, { RatingElementSpecificProps } from "../../../components/Form/elements/RatingElement";
import TextFieldInterface from "../../../components/Form/definitions/TextFieldInterface";

type RatingProps = RatingElementSpecificProps & TextFieldInterface;

const Rating = ({
    name,
    path,
    label,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    help,
    disableTranslateHelp = false,
    required = false,
    hidden = false,
    disabled = false,
    validationSchema,
    ...elementSpecificProps
}: RatingProps) => {
    if (typeof name === "undefined") {
        throw new Error("Rating component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, resolveValidationSchema, getError, getLabel, getHelp } = useForm();
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

    return (
        <RatingElement
            {...{
                name,
                path: resolvedPath,
                label: resolvedLabel,
                error: resolvedError,
                help: resolvedHelp,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                ...elementSpecificProps,
            }}
        />
    );
};

export default Rating;
export { RatingProps };
