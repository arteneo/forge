import { Enum } from "../../../classes/Enum";
import { Select, type SelectProps } from "../../../components/Form/fields/Select";

interface SelectEnumSpecificProps {
    enum: Enum;
}

type SelectEnumProps = SelectEnumSpecificProps & Omit<SelectProps, "options">;

const SelectEnum = ({ enum: enumClass, ...selectProps }: SelectEnumProps) => {
    return (
        <Select
            {...{
                options: enumClass.getOptions(),
                ...selectProps,
            }}
        />
    );
};

export { SelectEnum, type SelectEnumProps, type SelectEnumSpecificProps };
