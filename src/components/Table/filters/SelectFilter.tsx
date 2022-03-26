import React from "react";
import Select, { SelectProps } from "../../../components/Form/fields/Select";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type SelectFilterProps = FilterFieldInterface & SelectProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const SelectFilter = ({ filterBy, filterType, ...props }: SelectFilterProps) => {
    return <Select {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
SelectFilter.defaultProps = {
    filterType: "equal",
};

export default SelectFilter;
export { SelectFilterProps };
