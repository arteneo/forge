import React from "react";
import { FormatItalic } from "@material-ui/icons";
import MarkButton, { MarkButtonProps } from "@arteneo/forge/slate/components/MarkButton";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { RenderLeafProps } from "slate-react";

// const boldPlugin = {
//     button: BoldButton,
// }

// TODO Typings
const italicSerializeInline = (node: any, result: SerializeInlineResult): void => {
    if (node.italic) {
        result.attributes["data-italic"] = true;
        result.text = "<em>" + result.text + "</em>";
    }
};

const italicDeserializeInline = (element: HTMLElement, elementProps: DeserializeElementPropsInterface): void => {
    if (element.nodeName === "EM" || element.hasAttribute("data-italic")) {
        elementProps["italic"] = true;
    }
};

const italicLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
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

export { italicLeaf, italicSerializeInline, italicDeserializeInline, ItalicButton, ItalicButtonProps };
