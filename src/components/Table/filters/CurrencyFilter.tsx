import React from "react";
import Currency, { Props as CurrencyProps } from "@arteneo/forge/components/Form/fields/Currency";
import FilterType from "@arteneo/forge/components/Table/definitions/FilterType";

interface CurrencyFilterProps extends CurrencyProps {
    filterBy?: string;
    filterType?: FilterType;
}

const CurrencyFilter = ({ filterBy, filterType = "equal", ...props }: CurrencyFilterProps) => {
    return <Currency {...props} />;
};

export default CurrencyFilter;
export { CurrencyFilterProps };
