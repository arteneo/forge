import React from "react";
import TimePicker, { TimePickerProps } from "../../../components/Form/fields/TimePicker";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type TimeToFilterProps = FilterFieldInterface & TimePickerProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const TimeToFilter = ({ filterBy, filterType, ...props }: TimeToFilterProps) => {
    return <TimePicker {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
TimeToFilter.defaultProps = {
    filterType: "timeLessThanOrEqual",
};

export default TimeToFilter;
export { TimeToFilterProps };
