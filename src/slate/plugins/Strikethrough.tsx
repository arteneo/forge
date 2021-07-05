import React from "react";
import { FormatStrikethrough } from "@material-ui/icons";
import MarkButton, { MarkButtonProps } from "@arteneo/forge/slate/components/MarkButton";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { RenderLeafProps } from "slate-react";

// const boldPlugin = {
//     button: BoldButton,
// }

// TODO Typings
const strikethroughSerializeInline = (node: any, result: SerializeInlineResult): void => {
    if (node.strikethrough) {
        result.attributes["data-strikethrough"] = true;
        result.text = "<s>" + result.text + "</s>";
    }
};

const strikethroughDeserializeInline = (element: HTMLElement, elementProps: DeserializeElementPropsInterface): void => {
    if (element.nodeName === "S" || element.hasAttribute("data-strikethrough")) {
        elementProps["strikethrough"] = true;
    }
};

const strikethroughLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
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

export {
    strikethroughLeaf,
    strikethroughSerializeInline,
    strikethroughDeserializeInline,
    StrikethroughButton,
    StrikethroughButtonProps,
};
