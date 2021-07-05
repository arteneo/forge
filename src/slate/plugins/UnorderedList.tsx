import React from "react";
import { FormatListBulleted } from "@material-ui/icons";
import { RenderElementProps } from "slate-react";
import { jsx } from "slate-hyperscript";
import ElementButton, { ElementButtonProps } from "@arteneo/forge/slate/components/ElementButton";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";

// const boldPlugin = {
//     button: BoldButton,
// }

// TODO Typings
const unorderedListSerializeElement = (node: any, children: any): void | string => {
    if (node.type === "unordered-list") {
        return "<ul>" + children + "</ul>";
    }
};

const unorderedListDeserializeElement = (element: HTMLElement, children: any): void | CustomElement => {
    if (element.nodeName === "UL") {
        return jsx("element", { type: "unordered-list" }, children);
    }
};

const unorderedListElement = ({ attributes, children, element }: RenderElementProps): void | React.ReactNode => {
    switch (element.type) {
        case "unordered-list":
            return <ul {...attributes}>{children}</ul>;
    }
};

type UnorderedListButtonProps = Optional<ElementButtonProps, "format">;

const UnorderedListButton = ({ ...elementButtonProps }: UnorderedListButtonProps) => {
    return (
        <ElementButton
            {...{
                format: "unordered-list",
                children: <FormatListBulleted />,
                ...elementButtonProps,
            }}
        />
    );
};

export {
    unorderedListElement,
    unorderedListSerializeElement,
    unorderedListDeserializeElement,
    UnorderedListButton,
    UnorderedListButtonProps,
};
