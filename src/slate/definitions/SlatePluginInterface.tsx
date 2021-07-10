import { RenderElementProps, RenderLeafProps } from "slate-react";
import SerializeInlineResultInteface from "@arteneo/forge/slate/definitions/SerializeInlineResultInteface";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import NodeType from "@arteneo/forge/slate/definitions/NodeType";

interface SlatePluginInterface {
    toolbarComponent?: React.ReactElement;
    renderLeaf?: (props: RenderLeafProps) => React.ReactNode;
    renderElement?: (props: RenderElementProps) => JSX.Element;
    serializeInline?: (node: NodeType, result: SerializeInlineResultInteface) => SerializeInlineResultInteface;
    deserializeInline?: (
        element: HTMLElement,
        elementProps: DeserializeElementPropsInterface
    ) => DeserializeElementPropsInterface;
    serializeElement?: (node: NodeType, children: string) => undefined | string;
    deserializeElement?: (element: Node, children: any) => undefined | any;
}

export default SlatePluginInterface;
