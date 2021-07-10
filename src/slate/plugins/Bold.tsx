import React from "react";
import { FormatBold } from "@material-ui/icons";
import MarkButton, { MarkButtonProps } from "@arteneo/forge/slate/components/MarkButton";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { RenderLeafProps } from "slate-react";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";

const serializeInline = (node: any, result: SerializeInlineResult): SerializeInlineResult => {
    if (node.strong) {
        result.attributes["data-strong"] = true;
        result.text = "<strong>" + result.text + "</strong>";
    }

    return result;
};

const deserializeInline = (
    element: Element,
    elementProps: DeserializeElementPropsInterface
): DeserializeElementPropsInterface => {
    if (element.nodeName === "STRONG" || element.hasAttribute("data-strong")) {
        elementProps["strong"] = true;
    }

    return elementProps;
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.strong) {
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
export { renderLeaf, serializeInline, deserializeInline, BoldButton, BoldButtonProps };
