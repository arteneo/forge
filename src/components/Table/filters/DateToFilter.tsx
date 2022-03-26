import React from "react";
import Date, { DateProps } from "../../../components/Form/fields/Date";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type DateToFilterProps = FilterFieldInterface & DateProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const DateToFilter = ({ filterBy, filterType, ...props }: DateToFilterProps) => {
    return <Date {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
DateToFilter.defaultProps = {
    filterType: "dateLessThanOrEqual",
};

export default DateToFilter;
export { DateToFilterProps };
