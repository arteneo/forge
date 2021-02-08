import React from "react";
import Select, { Props as SelectProps } from "forge-react/components/Form/fields/Select";
import FilterType from "forge-react/components/Table/definitions/FilterType";

interface Props extends SelectProps {
    filterBy?: string;
    filterType?: FilterType;
}

// eslint-disable-next-line
const SelectFilter: React.FC<Props> = ({ filterBy, filterType, ...props }: Props) => {
    return <Select {...props} />;
};

SelectFilter.defaultProps = {
    filterType: "equal",
};

export default SelectFilter;
