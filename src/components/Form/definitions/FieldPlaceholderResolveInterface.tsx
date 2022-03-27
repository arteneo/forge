import FieldResolveInterface from "../../../components/Form/definitions/FieldResolveInterface";
import FieldPlaceholderType from "../../../components/Form/definitions/FieldPlaceholderType";

interface FieldPlaceholderResolveInterface extends FieldResolveInterface {
    placeholder?: FieldPlaceholderType;
    enableAutoPlaceholder?: boolean;
    disableTranslatePlaceholder?: boolean;
}

export default FieldPlaceholderResolveInterface;
