import React from "react";
import DateTime, { DateTimeProps } from "@arteneo/forge/components/Form/fields/DateTime";
import FilterFieldInterface from "@arteneo/forge/components/Table/definitions/FilterFieldInterface";

type DateTimeFromFilterProps = FilterFieldInterface & DateTimeProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const DateTimeFromFilter = ({ filterBy, filterType, ...props }: DateTimeFromFilterProps) => {
    return <DateTime {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
DateTimeFromFilter.defaultProps = {
    filterType: "dateTimeGreaterThanOrEqual",
};

export default DateTimeFromFilter;
export { DateTimeFromFilterProps };
