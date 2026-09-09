import React from "react";

import Enum from "../../../classes/Enum";
import Radio, { RadioProps } from "../../../components/Form/fields/Radio";

interface RadioEnumSpecificProps {
    enum: Enum;
}

type RadioEnumProps = RadioEnumSpecificProps & Omit<RadioProps, "options">;

const RadioEnum = ({ enum: enumClass, ...radioProps }: RadioEnumProps) => {
    return (
        <Radio
            {...{
                options: enumClass.getOptions(),
                ...radioProps,
            }}
        />
    );
};

export default RadioEnum;
export { RadioEnumProps, RadioEnumSpecificProps };
