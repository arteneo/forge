import React from "react";
import { FormatBold } from "@material-ui/icons";
import MarkButton, { MarkButtonProps } from "@arteneo/forge/slate/components/MarkButton";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { RenderLeafProps } from "slate-react";

// const boldPlugin = {
//     button: BoldButton,
// }

// TODO Typings
const boldSerializeInline = (node: any, result: SerializeInlineResult): void => {
    if (node.bold) {
        result.attributes["data-strong"] = true;
        result.text = "<strong>" + result.text + "</strong>";
    }
};

const boldDeserializeInline = (element: HTMLElement, elementProps: DeserializeElementPropsInterface): void => {
    if (element.nodeName === "STRONG" || element.hasAttribute("data-strong")) {
        elementProps["strong"] = true;
    }
};

const boldLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
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
                format: "bold",
                children: <FormatBold />,
                ...markButtonProps,
            }}
        />
    );
};

export { boldLeaf, boldSerializeInline, boldDeserializeInline, BoldButton, BoldButtonProps };
