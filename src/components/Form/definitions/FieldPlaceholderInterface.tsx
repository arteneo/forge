import FieldInterface from "../../../components/Form/definitions/FieldInterface";
import FieldPlaceholderType from "../../../components/Form/definitions/FieldPlaceholderType";

interface FieldPlaceholderInterface extends FieldInterface {
    placeholder?: FieldPlaceholderType;
    enableAutoPlaceholder?: boolean;
    disableTranslatePlaceholder?: boolean;
}

export default FieldPlaceholderInterface;
