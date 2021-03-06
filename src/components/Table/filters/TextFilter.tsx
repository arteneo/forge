import React from "react";
import Text, { TextProps } from "@arteneo/forge/components/Form/fields/Text";
import FilterFieldInterface from "@arteneo/forge/components/Table/definitions/FilterFieldInterface";

type TextFilterProps = FilterFieldInterface & TextProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const TextFilter = ({ filterBy, filterType, ...props }: TextFilterProps) => {
    return <Text {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
TextFilter.defaultProps = {
    filterType: "like",
};

export default TextFilter;
export { TextFilterProps };
