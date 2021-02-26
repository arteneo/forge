import React from "react";
import Currency, { Props as CurrencyProps } from "@arteneo/forge/components/Form/fields/Currency";
import FilterFieldInterface from "@arteneo/forge/components/Table/definitions/FilterFieldInterface";

type CurrencyFilterProps = FilterFieldInterface & CurrencyProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const CurrencyFilter = ({ filterBy, filterType, ...props }: CurrencyFilterProps) => {
    return <Currency {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
CurrencyFilter.defaultProps = {
    filterType: "equal",
};

export default CurrencyFilter;
export { CurrencyFilterProps };
