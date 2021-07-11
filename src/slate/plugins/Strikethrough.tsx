import React from "react";
import { FormatStrikethrough } from "@material-ui/icons";
import MarkButton, { MarkButtonProps } from "@arteneo/forge/slate/components/MarkButton";
import SerializeInlineResultInteface from "@arteneo/forge/slate/definitions/SerializeInlineResultInteface";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { RenderLeafProps } from "slate-react";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";
import FormattedTextInterface from "@arteneo/forge/slate/definitions/FormattedTextInterface";

interface StrikethroughInterface extends FormattedTextInterface {
    kind: "strikethrough";
    strikethrough?: boolean;
}

const serializeInline = (node: any, result: SerializeInlineResultInteface): SerializeInlineResultInteface => {
    if (node.strikethrough) {
        result.attributes["data-strikethrough"] = true;
        result.text = "<s>" + result.text + "</s>";
    }

    return result;
};

const deserializeInline = (
    element: HTMLElement,
    elementProps: DeserializeElementPropsInterface
): DeserializeElementPropsInterface => {
    if (element.nodeName === "S" || element.hasAttribute("data-strikethrough")) {
        elementProps["strikethrough"] = true;
    }

    return elementProps;
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.strikethrough) {
        return <s {...attributes}>{children}</s>;
    }

    return children;
};

type StrikethroughButtonProps = Optional<MarkButtonProps, "format">;

const StrikethroughButton = ({ ...markButtonProps }: StrikethroughButtonProps) => {
    return (
        <MarkButton
            {...{
                format: "strikethrough",
                children: <FormatStrikethrough />,
                ...markButtonProps,
            }}
        />
    );
};

const plugin: SlatePluginInterface = {
    toolbarComponent: <StrikethroughButton />,
    renderLeaf,
    serializeInline,
    deserializeInline,
};

export default plugin;
export {
    StrikethroughInterface,
    renderLeaf,
    serializeInline,
    deserializeInline,
    StrikethroughButton,
    StrikethroughButtonProps,
};
