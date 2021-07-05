import React from "react";
import { FormatUnderlined } from "@material-ui/icons";
import MarkButton, { MarkButtonProps } from "@arteneo/forge/slate/components/MarkButton";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { RenderLeafProps } from "slate-react";

// const boldPlugin = {
//     button: BoldButton,
// }

// TODO Typings
const underlineSerializeInline = (node: any, result: SerializeInlineResult): void => {
    if (node.underline) {
        result.attributes["data-underline"] = true;
        result.text = "<u>" + result.text + "</u>";
    }
};

const underlineDeserializeInline = (element: HTMLElement, elementProps: DeserializeElementPropsInterface): void => {
    if (element.nodeName === "U" || element.hasAttribute("data-underline")) {
        elementProps["underline"] = true;
    }
};

const underlineLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.underline) {
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

export { underlineLeaf, underlineSerializeInline, underlineDeserializeInline, UnderlineButton, UnderlineButtonProps };
