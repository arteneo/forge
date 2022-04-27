import React from "react";
import SelectEnum, { SelectEnumProps } from "../../../components/Form/fields/SelectEnum";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type SelectEnumFilterProps = FilterFieldInterface & SelectEnumProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const SelectEnumFilter = ({ filterBy, filterType, ...props }: SelectEnumFilterProps) => {
    return <SelectEnum {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
SelectEnumFilter.defaultProps = {
    filterType: "equal",
};

export default SelectEnumFilter;
export { SelectEnumFilterProps };
