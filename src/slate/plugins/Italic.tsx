import React from "react";
import { FormatItalic } from "@material-ui/icons";
import MarkButton, { MarkButtonProps } from "@arteneo/forge/slate/components/MarkButton";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { RenderLeafProps } from "slate-react";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";

const serializeInline = (node: any, result: SerializeInlineResult): SerializeInlineResult => {
    if (node.italic) {
        result.attributes["data-italic"] = true;
        result.text = "<em>" + result.text + "</em>";
    }

    return result;
};

const deserializeInline = (
    element: Element,
    elementProps: DeserializeElementPropsInterface
): DeserializeElementPropsInterface => {
    if (element.nodeName === "EM" || element.hasAttribute("data-italic")) {
        elementProps["italic"] = true;
    }

    return elementProps;
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.italic) {
        return <em {...attributes}>{children}</em>;
    }

    return children;
};

type ItalicButtonProps = Optional<MarkButtonProps, "format">;

const ItalicButton = ({ ...markButtonProps }: ItalicButtonProps) => {
    return (
        <MarkButton
            {...{
                format: "italic",
                children: <FormatItalic />,
                ...markButtonProps,
            }}
        />
    );
};

const plugin: SlatePluginInterface = {
    toolbarComponent: <ItalicButton />,
    renderLeaf,
    serializeInline,
    deserializeInline,
};

export default plugin;
export { renderLeaf, serializeInline, deserializeInline, ItalicButton, ItalicButtonProps };
