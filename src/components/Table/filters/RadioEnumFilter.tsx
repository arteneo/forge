import React from "react";
import RadioEnum, { RadioEnumProps } from "../../../components/Form/fields/RadioEnum";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type RadioEnumFilterProps = FilterFieldInterface & RadioEnumProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const RadioEnumFilter = ({ filterBy, filterType, enableClear = true, ...props }: RadioEnumFilterProps) => {
    return (
        <RadioEnum
            {...{
                enableClear,
                ...props,
            }}
        />
    );
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
RadioEnumFilter.defaultProps = {
    filterType: "equal",
};

export default RadioEnumFilter;
export { RadioEnumFilterProps };
