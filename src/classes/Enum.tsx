import OptionInterface from "../components/Form/definitions/OptionInterface";
import OptionsType from "../components/Form/definitions/OptionsType";

type EnumType = string;

class Enum {
    enums: EnumType[];
    prefix: string;
    invalidLabel: string;

    constructor(enums: EnumType[], prefix: string, invalidLabel = "enum.invalid") {
        this.enums = enums;
        this.prefix = prefix;
        this.invalidLabel = invalidLabel;
    }

    getEnums(): EnumType[] {
        return this.enums;
    }

    getOptions(): OptionsType {
        return this.enums.map((enumName) => ({
            id: enumName,
            representation: this.getLabel(enumName),
        }));
    }

    getOption(enumName: EnumType): undefined | OptionInterface {
        if (!this.isValid(enumName)) {
            return undefined;
        }

        return {
            id: enumName,
            representation: this.getLabel(enumName),
        };
    }

    getLabel(enumName: EnumType): string {
        if (!this.isValid(enumName)) {
            console.warn("Enum " + enumName + " does not exist. Following enums are present: " + this.enums.join(", "));
            return this.invalidLabel;
        }

        return this.prefix + enumName;
    }

    isValid(enumName: EnumType): boolean {
        return this.enums.includes(enumName);
    }
}

export default Enum;
export { EnumType };
