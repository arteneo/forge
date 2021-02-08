import React from "react";
import Date, { Props as DateProps } from "forge-react/components/Form/fields/Date";
import FilterType from "forge-react/components/Table/definitions/FilterType";

interface Props extends DateProps {
    filterBy?: string;
    filterType?: FilterType;
}

// eslint-disable-next-line
const DateToFilter: React.FC<Props> = ({ filterBy, filterType, ...props }: Props) => {
    return <Date {...props} />;
};

DateToFilter.defaultProps = {
    filterType: "dateLessThanOrEqual",
};

export default DateToFilter;
