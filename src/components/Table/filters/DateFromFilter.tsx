import React from "react";
import Date, { Props as DateProps } from "@arteneo/forge/components/Form/fields/Date";
import FilterFieldInterface from "@arteneo/forge/components/Table/definitions/FilterFieldInterface";

type DateFromFilterProps = FilterFieldInterface & DateProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const DateFromFilter = ({ filterBy, filterType, ...props }: DateFromFilterProps) => {
    return <Date {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
DateFromFilter.defaultProps = {
    filterType: "dateGreaterThanOrEqual",
};

export default DateFromFilter;
export { DateFromFilterProps };
