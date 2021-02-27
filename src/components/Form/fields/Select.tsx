import React from "react";
import * as Yup from "yup";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import { resolveBooleanOrFunction, resolveUpdatedValidationSchema } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikProps, useFormikContext } from "formik";
import SelectElement, { SelectAutocompleteOptionalProps } from "@arteneo/forge/components/Form/elements/Select";
import TextFieldInterface from "@arteneo/forge/components/Form/definitions/TextFieldInterface";
import { AutocompleteChangeReason, AutocompleteChangeDetails } from "@material-ui/lab";
import OptionsType from "@arteneo/forge/components/Form/definitions/OptionsType";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";
import { SelectValueType } from "@arteneo/forge/components/Form/definitions/AutocompleteTypes";
import { FormControlProps } from "@material-ui/core";

interface Props extends TextFieldInterface {
    options: OptionsType;
    disableTranslateOption?: boolean;
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
    autocompleteProps?: SelectAutocompleteOptionalProps;
    formControlProps?: FormControlProps;
}

const Select: React.FC<Props> = ({
    name,
    options,
    disableTranslateOption = false,
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
    autocompleteProps,
    formControlProps,
}: Props) => {
    if (typeof name === "undefined") {
        throw new Error("Text component: name is required prop. By default it is injected by FormContent.");
    }

    const { isReady, setValidationSchema, getError, getLabel, getHelp } = useForm();
    const { values, touched, errors }: FormikProps<FormikValues> = useFormikContext();

    const resolvedRequired = resolveBooleanOrFunction(required, values, touched, errors, name);
    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);

    React.useEffect(
        () =>
            setValidationSchema(
                name,
                resolveUpdatedValidationSchema(validationSchema, resolvedHidden, resolvedRequired)
            ),
        [resolvedRequired, resolvedHidden]
    );

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
                autocompleteProps,
                formControlProps,
            }}
        />
    );
};

export default Select;
export { Props };
