import React from "react";
import DatePicker, { DatePickerProps } from "../../../components/Form/fields/DatePicker";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type DateFromFilterProps = FilterFieldInterface & DatePickerProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const DateFromFilter = ({ filterBy, filterType, ...props }: DateFromFilterProps) => {
    return <DatePicker {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
DateFromFilter.defaultProps = {
    filterType: "dateGreaterThanOrEqual",
};

export default DateFromFilter;
export { DateFromFilterProps };
