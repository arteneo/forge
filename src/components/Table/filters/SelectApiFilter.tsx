import React from "react";
import SelectApi, { Props as SelectApiProps } from "@arteneo/forge/components/Form/fields/SelectApi";
import FilterType from "@arteneo/forge/components/Table/definitions/FilterType";

interface Props extends SelectApiProps {
    filterBy?: string;
    filterType?: FilterType;
}

// eslint-disable-next-line
const SelectApiFilter: React.FC<Props> = ({ filterBy, filterType, ...props }: Props) => {
    return <SelectApi {...props} />;
};

SelectApiFilter.defaultProps = {
    filterType: "equal",
};

export default SelectApiFilter;
