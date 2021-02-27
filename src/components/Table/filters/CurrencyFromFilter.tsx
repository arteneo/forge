import React from "react";
import Currency, { CurrencyProps } from "@arteneo/forge/components/Form/fields/Currency";
import FilterFieldInterface from "@arteneo/forge/components/Table/definitions/FilterFieldInterface";

type CurrencyFromFilterProps = FilterFieldInterface & CurrencyProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const CurrencyFromFilter = ({ filterBy, filterType, ...props }: CurrencyFromFilterProps) => {
    return <Currency {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
CurrencyFromFilter.defaultProps = {
    filterType: "greaterThanOrEqual",
};

export default CurrencyFromFilter;
export { CurrencyFromFilterProps };
