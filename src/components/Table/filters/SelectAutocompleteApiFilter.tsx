import React from "react";
import SelectAutocompleteApi, {
    SelectAutocompleteApiProps,
} from "../../../components/Form/fields/SelectAutocompleteApi";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type SelectAutocompleteApiFilterProps = FilterFieldInterface & SelectAutocompleteApiProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const SelectAutocompleteApiFilter = ({ filterBy, filterType, ...props }: SelectAutocompleteApiFilterProps) => {
    return <SelectAutocompleteApi {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
SelectAutocompleteApiFilter.defaultProps = {
    filterType: "equal",
};

export default SelectAutocompleteApiFilter;
export { SelectAutocompleteApiFilterProps };
