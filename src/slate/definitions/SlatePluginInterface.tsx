import { Descendant } from "slate";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import SerializeInlineResultInteface from "@arteneo/forge/slate/definitions/SerializeInlineResultInteface";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import DeserializeElementType from "@arteneo/forge/slate/definitions/DeserializeElementType";
import DeserializeType from "@arteneo/forge/slate/definitions/DeserializeType";
import ElementType from "@arteneo/forge/slate/definitions/ElementType";
import TextType from "@arteneo/forge/slate/definitions/TextType";

interface SlatePluginInterface {
    toolbarComponent?: React.ReactElement;
    renderLeaf?: (props: RenderLeafProps) => React.ReactNode;
    renderElement?: (props: RenderElementProps) => undefined | JSX.Element;
    serializeInline?: (node: TextType, result: SerializeInlineResultInteface) => SerializeInlineResultInteface;
    deserializeInline?: (
        element: HTMLElement,
        elementProps: DeserializeElementPropsInterface
    ) => DeserializeElementPropsInterface;
    serializeElement?: (node: ElementType, children: string) => undefined | string;
    deserializeElement?: (element: Node, children: DeserializeType[]) => DeserializeElementType;
}

export default SlatePluginInterface;
