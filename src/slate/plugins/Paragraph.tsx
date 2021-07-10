import React from "react";
import { RenderElementProps } from "slate-react";
import { jsx } from "slate-hyperscript";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";
import TextType from "@arteneo/forge/slate/definitions/TextType";

interface ParagraphElementInterface {
    type: "paragraph";
    children: TextType[];
}

const serializeElement = (node: any, children: string): undefined | string => {
    switch (node.type) {
        case "paragraph":
            return "<p>" + children + "</p>";
    }
};

const deserializeElement = (element: Node, children: any): undefined | any => {
    switch (element.nodeName) {
        case "P":
            return jsx("element", { type: "paragraph" }, children);
    }
};

const renderElement = ({ attributes, children, element }: RenderElementProps): JSX.Element => {
    switch (element.type) {
        case "paragraph":
            return <p {...attributes}>{children}</p>;
    }

    return children;
};

const plugin: SlatePluginInterface = {
    renderElement,
    serializeElement,
    deserializeElement,
};

export default plugin;
export { ParagraphElementInterface, renderElement, serializeElement, deserializeElement };
