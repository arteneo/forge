import React from "react";
import Time, { TimeProps } from "../../../components/Form/fields/Time";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type TimeFromFilterProps = FilterFieldInterface & TimeProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const TimeFromFilter = ({ filterBy, filterType, ...props }: TimeFromFilterProps) => {
    return <Time {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
TimeFromFilter.defaultProps = {
    filterType: "timeGreaterThanOrEqual",
};

export default TimeFromFilter;
export { TimeFromFilterProps };
