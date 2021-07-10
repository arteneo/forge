import React from "react";
import { FormatListNumbered } from "@material-ui/icons";
import { RenderElementProps } from "slate-react";
import { jsx } from "slate-hyperscript";
import ElementButton, { ElementButtonProps } from "@arteneo/forge/slate/components/ElementButton";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import TextType from "@arteneo/forge/slate/definitions/TextType";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";

type OrderedListElementType = "ordered-list" | "ordered-list-item";

interface OrderedListElementInterface {
    type: OrderedListElementType;
    children: TextType[];
}

const serializeElement = (node: any, children: string): undefined | string => {
    switch (node.type) {
        case "ordered-list":
            return "<ol>" + children + "</ol>";
        case "ordered-list-item":
            return "<li>" + children + "</li>";
    }
};

const deserializeElement = (element: Node, children: any): undefined | any => {
    if (element.nodeName === "OL") {
        return jsx("element", { type: "ordered-list" }, children);
    }

    if (element.parentElement?.nodeName === "LI") {
        return jsx("element", { type: "ordered-list-item" }, children);
    }
};

const renderElement = ({ attributes, children, element }: RenderElementProps): JSX.Element => {
console.log("🚀 ~ file: OrderedList.tsx ~ line 37 ~ element", element)
    switch (element.type) {
        case "ordered-list":
            return <ol {...attributes}>{children}</ol>;
        case "ordered-list-item":
            return <li {...attributes}>{children}</li>;
    }

    return children;
};

type OrderedListButtonProps = Optional<ElementButtonProps, "format">;

const OrderedListButton = ({ ...elementButtonProps }: OrderedListButtonProps) => {
    return (
        <ElementButton
            {...{
                format: "ordered-list",
                formatListItem: "ordered-list-item",
                children: <FormatListNumbered />,
                ...elementButtonProps,
            }}
        />
    );
};

const plugin: SlatePluginInterface = {
    toolbarComponent: <OrderedListButton />,
    renderElement,
    serializeElement,
    deserializeElement,
};

export default plugin;
export {
    OrderedListElementType,
    OrderedListElementInterface,
    renderElement,
    serializeElement,
    deserializeElement,
    OrderedListButton,
    OrderedListButtonProps,
};
