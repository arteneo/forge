import React from "react";
import DateTimePicker, { DateTimePickerProps } from "../../../components/Form/fields/DateTimePicker";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type DateTimeToFilterProps = FilterFieldInterface & DateTimePickerProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const DateTimeToFilter = ({ filterBy, filterType, ...props }: DateTimeToFilterProps) => {
    return <DateTimePicker {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
DateTimeToFilter.defaultProps = {
    filterType: "dateTimeLessThanOrEqual",
};

export default DateTimeToFilter;
export { DateTimeToFilterProps };
