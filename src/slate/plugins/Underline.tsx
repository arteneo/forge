import React from "react";
import { FormatUnderlined } from "@material-ui/icons";
import MarkButton, { MarkButtonProps } from "@arteneo/forge/slate/components/MarkButton";
import SerializeInlineResultInteface from "@arteneo/forge/slate/definitions/SerializeInlineResultInteface";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { RenderLeafProps } from "slate-react";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";
import FormattedTextInterface from "@arteneo/forge/slate/definitions/FormattedTextInterface";
import TextType from "@arteneo/forge/slate/definitions/TextType";

interface UnderlineInterface extends FormattedTextInterface {
    underline?: boolean;
}

const serializeInline = (node: TextType, result: SerializeInlineResultInteface): SerializeInlineResultInteface => {
    const underlineNode = node as UnderlineInterface;

    if (underlineNode.underline) {
        result.attributes["data-underline"] = true;
        result.text = "<u>" + result.text + "</u>";
    }

    return result;
};

const deserializeInline = (
    element: HTMLElement,
    elementProps: DeserializeElementPropsInterface
): DeserializeElementPropsInterface => {
    if (element.nodeName === "U" || element.hasAttribute("data-underline")) {
        elementProps["underline"] = true;
    }

    return elementProps;
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    const underlineLeaf = leaf as UnderlineInterface;

    if (underlineLeaf.underline) {
        return <u {...attributes}>{children}</u>;
    }

    return children;
};

type UnderlineButtonProps = Optional<MarkButtonProps, "format">;

const UnderlineButton = ({ ...markButtonProps }: UnderlineButtonProps) => {
    return (
        <MarkButton
            {...{
                format: "underline",
                children: <FormatUnderlined />,
                ...markButtonProps,
            }}
        />
    );
};

const plugin: SlatePluginInterface = {
    toolbarComponent: <UnderlineButton />,
    renderLeaf,
    serializeInline,
    deserializeInline,
};

export default plugin;
export { UnderlineInterface, renderLeaf, serializeInline, deserializeInline, UnderlineButton, UnderlineButtonProps };
