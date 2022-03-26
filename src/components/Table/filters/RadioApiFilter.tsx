import React from "react";
import RadioApi, { RadioApiProps } from "../../../components/Form/fields/RadioApi";
import FilterFieldInterface from "../../../components/Table/definitions/FilterFieldInterface";

type RadioApiFilterProps = FilterFieldInterface & RadioApiProps;

// filterBy and filterType are destructed to avoid passing them deeper
// eslint-disable-next-line
const RadioApiFilter = ({ filterBy, filterType, enableClear = true, ...props }: RadioApiFilterProps) => {
    return (
        <RadioApi
            {...{
                enableClear,
                ...props,
            }}
        />
    );
};

// * It has to be done via .defaultProps so filterType is passed openly to this component and can be read by Table context
RadioApiFilter.defaultProps = {
    filterType: "equal",
};

export default RadioApiFilter;
export { RadioApiFilterProps };
