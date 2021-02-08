import React from "react";
import Time, { Props as TimeProps } from "forge-react/components/Form/fields/Time";
import FilterType from "forge-react/components/Table/definitions/FilterType";

interface Props extends TimeProps {
    filterBy?: string;
    filterType?: FilterType;
}

// eslint-disable-next-line
const TimeToFilter: React.FC<Props> = ({ filterBy, filterType, ...props }: Props) => {
    return <Time {...props} />;
};

TimeToFilter.defaultProps = {
    filterType: "timeLessThanOrEqual",
};

export default TimeToFilter;
