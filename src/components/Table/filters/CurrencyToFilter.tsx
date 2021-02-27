import React from "react";
import Currency, { CurrencyProps } from "@arteneo/forge/components/Form/fields/Currency";
import FilterFieldInterface from "@arteneo/forge/components/Table/definitions/FilterFieldInterface";

type CurrencyToFilterProps = FilterFieldInterface & CurrencyProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const CurrencyToFilter = ({ filterBy, filterType, ...props }: CurrencyToFilterProps) => {
    return <Currency {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
CurrencyToFilter.defaultProps = {
    filterType: "lessThanOrEqual",
};

export default CurrencyToFilter;
export { CurrencyToFilterProps };
