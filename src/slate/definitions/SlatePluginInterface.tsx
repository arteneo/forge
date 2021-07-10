import { RenderElementProps, RenderLeafProps } from "slate-react";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";

interface SlatePluginInterface {
    toolbarComponent?: React.ReactElement;
    renderLeaf?: (props: RenderLeafProps) => React.ReactNode;
    renderElement?: (props: RenderElementProps) => JSX.Element;
    serializeInline?: (node: any, result: SerializeInlineResult) => SerializeInlineResult;
    deserializeInline?: (
        element: Element,
        elementProps: DeserializeElementPropsInterface
    ) => DeserializeElementPropsInterface;
    serializeElement?: (node: any, children: string) => undefined | string;
    deserializeElement?: (element: Node, children: any) => undefined | any;
}

export default SlatePluginInterface;
