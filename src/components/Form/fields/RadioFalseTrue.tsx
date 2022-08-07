import React from "react";
import OptionsType from "../../../components/Form/definitions/OptionsType";
import RadioTrueFalse, { RadioTrueFalseProps } from "../../../components/Form/fields/RadioTrueFalse";

/**
 * Similar to RadioTrueFalse, but with inverted order of options (first is False, second is True)
 */
const RadioFalseTrue = (radioFalseTrueProps: RadioTrueFalseProps) => {
    const options: OptionsType = [
        {
            id: "false",
            representation: "radioTrueFalse.no",
        },
        {
            id: "true",
            representation: "radioTrueFalse.yes",
        },
    ];

    return (
        <RadioTrueFalse
            {...{
                options,
                ...radioFalseTrueProps,
            }}
        />
    );
};

RadioFalseTrue.defaultProps = {
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

export default RadioFalseTrue;
export { RadioTrueFalseProps as RadioFalseTrueProps };
