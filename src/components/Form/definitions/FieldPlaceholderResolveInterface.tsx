import FieldPlaceholderType from "../../../components/Form/definitions/FieldPlaceholderType";
import FieldResolveInterface from "../../../components/Form/definitions/FieldResolveInterface";

interface FieldPlaceholderResolveInterface extends FieldResolveInterface {
    placeholder?: FieldPlaceholderType;
    enableAutoPlaceholder?: boolean;
    disableTranslatePlaceholder?: boolean;
}

export default FieldPlaceholderResolveInterface;
