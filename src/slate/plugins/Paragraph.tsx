import React from "react";
import { RenderElementProps } from "slate-react";
import { jsx } from "slate-hyperscript";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";
import TextType from "@arteneo/forge/slate/definitions/TextType";
import DeserializeType from "@arteneo/forge/slate/definitions/DeserializeType";
import DeserializeElementType from "@arteneo/forge/slate/definitions/DeserializeElementType";
import ElementType from "@arteneo/forge/slate/definitions/ElementType";

type ParagraphElementType = "paragraph";

interface ParagraphElementInterface {
    type: ParagraphElementType;
    children: TextType[];
}

const serializeElement = (node: ElementType, children: string): undefined | string => {
    switch (node.type) {
        case "paragraph":
            return "<p>" + children + "</p>";
    }
};

const deserializeElement = (element: Node, children: DeserializeType[]): DeserializeElementType => {
    switch (element.nodeName) {
        case "P":
            return jsx("element", { type: "paragraph" }, children);
    }
};

const renderElement = ({ attributes, children, element }: RenderElementProps): undefined | JSX.Element => {
    switch (element.type) {
        case "paragraph":
            return <p {...attributes}>{children}</p>;
    }
};

const plugin: SlatePluginInterface = {
    renderElement,
    serializeElement,
    deserializeElement,
};

export default plugin;
export { ParagraphElementType, ParagraphElementInterface, renderElement, serializeElement, deserializeElement };
