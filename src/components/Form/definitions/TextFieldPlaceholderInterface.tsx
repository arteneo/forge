import TextFieldInterface from "../../../components/Form/definitions/TextFieldInterface";
import FieldPlaceholderType from "../../../components/Form/definitions/FieldPlaceholderType";

interface TextFieldPlaceholderInterface extends TextFieldInterface {
    placeholder?: FieldPlaceholderType;
    enableAutoPlaceholder?: boolean;
    disableTranslatePlaceholder?: boolean;
}

export default TextFieldPlaceholderInterface;
