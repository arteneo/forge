import React from "react";
import Radio, { RadioProps } from "../../../components/Form/fields/Radio";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import { Optional } from "../../../utilities/TypescriptOperators";

type TrueFalseProps = Optional<RadioProps, "options">;

const TrueFalse = (radioProps: TrueFalseProps) => {
    const options: OptionsType = [
        {
            id: "true",
            representation: "label.yes",
        },
        {
            id: "false",
            representation: "label.no",
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

TrueFalse.defaultProps = {
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

export default TrueFalse;
export { TrueFalseProps };
