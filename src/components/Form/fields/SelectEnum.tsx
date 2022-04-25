import React from "react";
import Select, { SelectProps } from "../../../components/Form/fields/Select";
import Enum from "../../../classes/Enum";

interface SelectEnumSpecificProps {
    enum: Enum;
}

type SelectEnumProps = SelectEnumSpecificProps & Omit<SelectProps, "options">;

const SelectEnum = ({ enum: enumClass, ...selectProps }: SelectEnumProps) => {
    return (
        <Select
            {...{
                options: enumClass.getOptions(),
                ...selectProps,
            }}
        />
    );
};

export default SelectEnum;
export { SelectEnumProps, SelectEnumSpecificProps };
