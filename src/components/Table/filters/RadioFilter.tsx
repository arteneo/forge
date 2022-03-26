import React from "react";
import Radio, { RadioProps } from "../../../components/Form/fields/Radio";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type RadioFilterProps = FilterFieldInterface & RadioProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const RadioFilter = ({ filterBy, filterType, enableClear = true, ...props }: RadioFilterProps) => {
    return (
        <Radio
            {...{
                enableClear,
                ...props,
            }}
        />
    );
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
RadioFilter.defaultProps = {
    filterType: "equal",
};

export default RadioFilter;
export { RadioFilterProps };
