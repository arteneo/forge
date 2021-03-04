import TextFieldInterface from "@arteneo/forge/components/Form/definitions/TextFieldInterface";
import FieldPlaceholderType from "@arteneo/forge/components/Form/definitions/FieldPlaceholderType";

interface TextFieldPlaceholderInterface extends TextFieldInterface {
    placeholder?: FieldPlaceholderType;
    enableAutoPlaceholder?: boolean;
    disableTranslatePlaceholder?: boolean;
}

export default TextFieldPlaceholderInterface;
