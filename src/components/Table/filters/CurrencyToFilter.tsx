import React from "react";
import Currency, { Props as CurrencyProps } from "forge-react/components/Form/fields/Currency";
import FilterType from "forge-react/components/Table/definitions/FilterType";

interface Props extends CurrencyProps {
    filterBy?: string;
    filterType?: FilterType;
}

// eslint-disable-next-line
const CurrencyToFilter: React.FC<Props> = ({ filterBy, filterType, ...props }: Props) => {
    return <Currency {...props} />;
};

CurrencyToFilter.defaultProps = {
    filterType: "lessThanOrEqual",
};

export default CurrencyToFilter;
