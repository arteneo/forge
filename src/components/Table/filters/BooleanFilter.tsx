import React from "react";
import TrueFalse, { TrueFalseProps } from "../../../components/Form/fields/TrueFalse";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type BooleanFilterProps = FilterFieldInterface & TrueFalseProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const BooleanFilter = ({ filterBy, filterType, enableClear = true, ...props }: BooleanFilterProps) => {
    return (
        <TrueFalse
            {...{
                enableClear,
                ...props,
            }}
        />
    );
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
BooleanFilter.defaultProps = {
    filterType: "boolean",
};

export default BooleanFilter;
export { BooleanFilterProps };
