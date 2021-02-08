import React from "react";
import { FormikValues, FormikProps, useFormikContext, getIn } from "formik";
import { TextFieldProps } from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

/**
 * TODO Prepare props definition for CurrencyTextField based on:
 * https://unicef.github.io/material-ui-currency-textfield/
 * Maybye it is worth forking the package and adding TS with proper definitions
 */
interface CurrencyFieldProps {
    currencySymbol: string;
}

type FieldProps = TextFieldProps | CurrencyFieldProps;

interface Props {
    name: string;
    label?: React.ReactNode;
    error?: string;
    help?: React.ReactNode;
    onChange?: (
        name: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        // eslint-disable-next-line
        value: any,
        onChange: () => void
    ) => void;
    required: boolean;
    disabled: boolean;
    fieldProps?: FieldProps;
}

const Currency: React.FC<Props> = ({ name, label, error, help, required, disabled, onChange, fieldProps }: Props) => {
    const { values, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    // eslint-disable-next-line
    const defaultOnChange = (event: React.ChangeEvent<HTMLInputElement>, value: any) => {
        if (typeof value === "number") {
            setFieldValue(name, value * 100);
            return;
        }

        setFieldValue(name, "");
    };

    // eslint-disable-next-line
    const onBlur = (event: React.ChangeEvent<HTMLInputElement>, value: any) => {
        if (event?.target?.value === "") {
            setFieldValue(name, "");
        }
    };

    // eslint-disable-next-line
    const callableOnChange = (event: React.ChangeEvent<HTMLInputElement>, value: any) => {
        if (onChange) {
            onChange(name, setFieldValue, event, value, () => defaultOnChange(event, value));
            return;
        }

        defaultOnChange(event, value);
    };

    const hasError = error ? true : false;
    const value = getIn(values, name, "");
    const resolvedValue = typeof value === "number" ? value / 100 : "";

    // We cannot use TextFieldProps. Best would be CurrencyTextField definitions, but we do not have them
    // eslint-disable-next-line
    const internalFieldProps: any = {
        // This is wierd. 0 (as a number) is treated as empty value (not converted to 0,00)
        value: resolvedValue === 0 ? "0" : resolvedValue,
        onChange: callableOnChange,
        // This is wierd. Empty value is treated as 0 (yay!), we use onBlur to fix that
        onBlur: onBlur,
        error: hasError,
        label,
        required,
        disabled,
        // * This does not work properly. When input is autoselected and you remove value using backspace onChange event is not fired
        selectOnFocus: false,
        textAlign: "left",
        currencySymbol: "zł",
        decimalCharacter: ",",
        digitGroupSeparator: " ",
        fullWidth: true,
        margin: "normal",
        helperText: undefined,
    };

    if (hasError || help) {
        internalFieldProps.helperText = (
            <>
                {error}
                {hasError && <br />}
                {help}
            </>
        );
    }

    const mergedFieldProps = Object.assign(internalFieldProps, fieldProps);

    return <CurrencyTextField {...mergedFieldProps} />;
};

export default Currency;
export { FieldProps };
