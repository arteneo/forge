import React from "react";
import Text, { Props as TextProps } from "@arteneo/forge/components/Form/fields/Text";
import FilterType from "@arteneo/forge/components/Table/definitions/FilterType";

interface Props extends TextProps {
    filterBy?: string;
    filterType?: FilterType;
}

// eslint-disable-next-line
const TextFilter: React.FC<Props> = ({ filterBy, filterType, ...props }: Props) => {
    return <Text {...props} />;
};

TextFilter.defaultProps = {
    filterType: "like",
};

export default TextFilter;
