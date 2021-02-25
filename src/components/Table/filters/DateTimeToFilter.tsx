import React from "react";
import DateTime, { Props as DateTimeProps } from "@arteneo/forge/components/Form/fields/DateTime";
import FilterType from "@arteneo/forge/components/Table/definitions/FilterType";

interface Props extends DateTimeProps {
    filterBy?: string;
    filterType?: FilterType;
}

// eslint-disable-next-line
const DateTimeToFilter: React.FC<Props> = ({ filterBy, filterType, ...props }: Props) => {
    return <DateTime {...props} />;
};

DateTimeToFilter.defaultProps = {
    filterType: "dateTimeLessThanOrEqual",
};

export default DateTimeToFilter;