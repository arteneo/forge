import React from "react";
import Radio, { RadioProps } from "../../../components/Form/fields/Radio";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import Optional from "../../../definitions/Optional";

type RadioTrueFalseProps = Optional<RadioProps, "options">;

const RadioTrueFalse = (radioProps: RadioTrueFalseProps) => {
    const options: OptionsType = [
        {
            id: "true",
            representation: "radioTrueFalse.yes",
        },
        {
            id: "false",
            representation: "radioTrueFalse.no",
        },
    ];

    const onChange = (
        path: string,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        event: React.ChangeEvent<HTMLInputElement>,
        value: string
    ) => {
        if (value === "true") {
            setFieldValue(path, true);
        }

        if (value === "false") {
            setFieldValue(path, false);
        }
    };

    return (
        <Radio
            {...{
                options,
                onChange,
                ...radioProps,
            }}
        />
    );
};

RadioTrueFalse.defaultProps = {
    // eslint-disable-next-line
    transformInitialValue: (value: any) => {
        if (typeof value === "undefined") {
            return value;
        }

        // Make sure it is a boolean value
        if (value === "false") {
            return false;
        }

        return Boolean(value);
    },
};

export default RadioTrueFalse;
export { RadioTrueFalseProps };
