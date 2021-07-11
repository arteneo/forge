import React from "react";
import { FormatBold } from "@material-ui/icons";
import MarkButton, { MarkButtonProps } from "@arteneo/forge/slate/components/MarkButton";
import SerializeInlineResultInteface from "@arteneo/forge/slate/definitions/SerializeInlineResultInteface";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { RenderLeafProps } from "slate-react";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";
import FormattedTextInterface from "@arteneo/forge/slate/definitions/FormattedTextInterface";
import TextType from "@arteneo/forge/slate/definitions/TextType";

interface BoldInterface extends FormattedTextInterface {
    strong?: boolean;
}

const serializeInline = (node: TextType, result: SerializeInlineResultInteface): SerializeInlineResultInteface => {
    const boldNode = node as BoldInterface;

    if (boldNode.strong) {
        result.attributes["data-strong"] = true;
        result.text = "<strong>" + result.text + "</strong>";
    }

    return result;
};

const deserializeInline = (
    element: HTMLElement,
    elementProps: DeserializeElementPropsInterface
): DeserializeElementPropsInterface => {
    if (element.nodeName === "STRONG" || element.hasAttribute("data-strong")) {
        elementProps["strong"] = true;
    }

    return elementProps;
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    const boldLeaf = leaf as BoldInterface;

    if (boldLeaf.strong) {
        return <strong {...attributes}>{children}</strong>;
    }

    return children;
};

type BoldButtonProps = Optional<MarkButtonProps, "format">;

const BoldButton = ({ ...markButtonProps }: BoldButtonProps) => {
    return (
        <MarkButton
            {...{
                format: "strong",
                children: <FormatBold />,
                ...markButtonProps,
            }}
        />
    );
};

const plugin: SlatePluginInterface = {
    toolbarComponent: <BoldButton />,
    renderLeaf,
    deserializeInline,
    serializeInline,
};

export default plugin;
export { BoldInterface, renderLeaf, serializeInline, deserializeInline, BoldButton, BoldButtonProps };
