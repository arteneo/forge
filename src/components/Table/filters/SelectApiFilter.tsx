import React from "react";
import SelectApi, { SelectApiProps } from "../../../components/Form/fields/SelectApi";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type SelectApiFilterProps = FilterFieldInterface & SelectApiProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const SelectApiFilter = ({ filterBy, filterType, ...props }: SelectApiFilterProps) => {
    return <SelectApi {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
SelectApiFilter.defaultProps = {
    filterType: "equal",
};

export default SelectApiFilter;
export { SelectApiFilterProps };
