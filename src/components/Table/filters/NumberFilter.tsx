import React from "react";
import Text, { TextProps } from "../../../components/Form/fields/Text";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type NumberFilterProps = FilterFieldInterface & TextProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const NumberFilter = ({ filterBy, filterType, ...props }: NumberFilterProps) => {
    return <Text {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
NumberFilter.defaultProps = {
    filterType: "equal",
};

export default NumberFilter;
export { NumberFilterProps };
