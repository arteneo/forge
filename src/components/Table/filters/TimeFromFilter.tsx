import React from "react";
import TimePicker, { TimePickerProps } from "../../../components/Form/fields/TimePicker";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type TimeFromFilterProps = FilterFieldInterface & TimePickerProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const TimeFromFilter = ({ filterBy, filterType, ...props }: TimeFromFilterProps) => {
    return <TimePicker {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
TimeFromFilter.defaultProps = {
    filterType: "timeGreaterThanOrEqual",
};

export default TimeFromFilter;
export { TimeFromFilterProps };
