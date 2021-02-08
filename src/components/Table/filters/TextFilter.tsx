import React from "react";
import Text, { Props as TextProps } from "forge-react/components/Form/fields/Text";
import FilterType from "forge-react/components/Table/definitions/FilterType";

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
