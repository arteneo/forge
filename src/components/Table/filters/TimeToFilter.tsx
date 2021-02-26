import React from "react";
import Time, { Props as TimeProps } from "@arteneo/forge/components/Form/fields/Time";
import FilterFieldInterface from "@arteneo/forge/components/Table/definitions/FilterFieldInterface";

type TimeToFilterProps = FilterFieldInterface & TimeProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const TimeToFilter = ({ filterBy, filterType, ...props }: TimeToFilterProps) => {
    return <Time {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
TimeToFilter.defaultProps = {
    filterType: "timeLessThanOrEqual",
};

export default TimeToFilter;
export { TimeToFilterProps };
