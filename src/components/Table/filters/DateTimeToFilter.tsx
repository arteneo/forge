import React from "react";
import DateTime, { Props as DateTimeProps } from "@arteneo/forge/components/Form/fields/DateTime";
import FilterFieldInterface from "@arteneo/forge/components/Table/definitions/FilterFieldInterface";

type DateTimeToFilterProps = FilterFieldInterface & DateTimeProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const DateTimeToFilter = ({ filterBy, filterType, ...props }: DateTimeToFilterProps) => {
    return <DateTime {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
DateTimeToFilter.defaultProps = {
    filterType: "dateTimeLessThanOrEqual",
};

export default DateTimeToFilter;
export { DateTimeToFilterProps };
