import React from "react";
import * as Yup from "yup";
import { useForm } from "../../../components/Form/contexts/Form";
import { resolveBooleanOrFunction } from "../../../utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import BooleanElement, { BooleanElementSpecificProps } from "../../../components/Form/elements/BooleanElement";
import TextFieldInterface from "../../../components/Form/definitions/TextFieldInterface";

type BooleanProps = BooleanElementSpecificProps & TextFieldInterface;

const Boolean = ({
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
}: BooleanProps) => {
    if (typeof name === "undefined") {
        throw new Error("Boolean component: name is required prop. By default it is injected by FormContent.");
    }

    const { getError, getLabel, getHelp } = useForm();
    const { values, touched, errors, submitCount }: FormikProps<FormikValues> = useFormikContext();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);
    const resolvedPath = path ? path : name;

    React.useEffect(() => updateValidationSchema(), [resolvedRequired, resolvedHidden]);

    const updateValidationSchema = () => {
        let defaultValidationSchema = Yup.boolean();

        if (resolvedRequired) {
            defaultValidationSchema = defaultValidationSchema.oneOf([true], "validation.required");
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

    if (resolvedHidden) {
        return null;
    }

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedError = getError(resolvedPath, touched, errors, submitCount);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);

    return (
        <BooleanElement
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

export default Boolean;
export { BooleanProps };
