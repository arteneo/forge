import React from "react";
import Currency, { Props as CurrencyProps } from "@arteneo/forge/components/Form/fields/Currency";
import FilterType from "@arteneo/forge/components/Table/definitions/FilterType";

interface Props extends CurrencyProps {
    filterBy?: string;
    filterType?: FilterType;
}

// eslint-disable-next-line
const CurrencyFromFilter: React.FC<Props> = ({ filterBy, filterType, ...props }: Props) => {
    return <Currency {...props} />;
};

CurrencyFromFilter.defaultProps = {
    filterType: "greaterThanOrEqual",
};

export default CurrencyFromFilter;
