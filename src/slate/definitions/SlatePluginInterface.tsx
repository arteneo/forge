import { RenderElementProps, RenderLeafProps } from "slate-react";
import SerializeInlineResultInteface from "@arteneo/forge/slate/definitions/SerializeInlineResultInteface";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";

interface SlatePluginInterface {
    toolbarComponent?: React.ReactElement;
    renderLeaf?: (props: RenderLeafProps) => React.ReactNode;
    renderElement?: (props: RenderElementProps) => JSX.Element;
    serializeInline?: (node: any, result: SerializeInlineResultInteface) => SerializeInlineResultInteface;
    deserializeInline?: (
        element: Element,
        elementProps: DeserializeElementPropsInterface
    ) => DeserializeElementPropsInterface;
    serializeElement?: (node: any, children: string) => undefined | string;
    deserializeElement?: (element: Node, children: any) => undefined | any;
}

export default SlatePluginInterface;
