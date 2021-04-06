import React from "react";
import Text, { TextProps } from "@arteneo/forge/components/Form/fields/Text";
import FilterFieldInterface from "@arteneo/forge/components/Table/definitions/FilterFieldInterface";
import * as Yup from "yup";

type NumberFilterProps = FilterFieldInterface & TextProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const NumberFilter = ({ filterBy, filterType, ...props }: NumberFilterProps) => {
    return <Text {...props} />;
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
NumberFilter.defaultProps = {
    filterType: "equal",
    validationSchema: Yup.number().typeError("validation.invalid.number"),
};

export default NumberFilter;
export { NumberFilterProps };
