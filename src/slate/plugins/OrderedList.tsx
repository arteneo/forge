import React from "react";
import { FormatListNumbered } from "@material-ui/icons";
import { RenderElementProps } from "slate-react";
import { jsx } from "slate-hyperscript";
import ElementButton, { ElementButtonProps } from "@arteneo/forge/slate/components/ElementButton";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";

// const boldPlugin = {
//     button: BoldButton,
// }

// TODO Typings
const orderedListSerializeElement = (node: any, children: any): void | string => {
    if (node.type === "ordered-list") {
        return "<ol>" + children + "</ol>";
    }
};

const orderedListDeserializeElement = (element: HTMLElement, children: any): void | CustomElement => {
    if (element.nodeName === "OL") {
        return jsx("element", { type: "ordered-list" }, children);
    }
};

const orderedListElement = ({ attributes, children, element }: RenderElementProps): void | React.ReactNode => {
    switch (element.type) {
        case "ordered-list":
            return <ol {...attributes}>{children}</ol>;
    }
};

type OrderedListButtonProps = Optional<ElementButtonProps, "format">;

const OrderedListButton = ({ ...elementButtonProps }: OrderedListButtonProps) => {
    return (
        <ElementButton
            {...{
                format: "ordered-list",
                children: <FormatListNumbered />,
                ...elementButtonProps,
            }}
        />
    );
};

export {
    orderedListElement,
    orderedListSerializeElement,
    orderedListDeserializeElement,
    OrderedListButton,
    OrderedListButtonProps,
};
