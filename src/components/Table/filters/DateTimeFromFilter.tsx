import React from "react";
import DateTimePicker, { DateTimePickerProps } from "../../../components/Form/fields/DateTimePicker";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type DateTimeFromFilterProps = FilterFieldInterface & DateTimePickerProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const DateTimeFromFilter = ({ filterBy, filterType, ...props }: DateTimeFromFilterProps) => {
    return <DateTimePicker {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
DateTimeFromFilter.defaultProps = {
    filterType: "dateTimeGreaterThanOrEqual",
};

export default DateTimeFromFilter;
export { DateTimeFromFilterProps };
