import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import SerializeInlineResultInteface from "@arteneo/forge/slate/definitions/SerializeInlineResultInteface";
import SlatePluginsType from "@arteneo/forge/slate/definitions/SlatePluginsType";
import { Editor, Transforms, Element as SlateElement, Text } from "slate";
import escapeHtml from "escape-html";
import { jsx } from "slate-hyperscript";

export const LIST_TYPES = ["ordered-list", "unordered-list"];

export const isElementActive = (editor: Editor, format: string) => {
    const [match] = Editor.nodes(editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });

    return !!match;
};

export const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: Editor, format: string, value: any = true) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, value);
    }
};

export const toggleElement = (editor: Editor, format: string) => {
    const isActive = isElementActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) => LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
        split: true,
    });
    const newProperties: Partial<SlateElement> = {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const element = { type: format, children: [] };
        Transforms.wrapNodes(editor, element);
    }
};

export const deserialize = (element: Element, plugins: SlatePluginsType): any => {
    if (element.nodeType === 3) {
        return element.textContent;
    }

    if (element.nodeType !== 1) {
        return null;
    }

    let children = Array.from(element.childNodes).map((childElement) => deserialize(childElement as Element, plugins));

    if (children.length === 0) {
        children = [{ text: "" }];
    }

    const result = deserializeElements(element, children, plugins);
    if (typeof result !== "undefined") {
        return result;
    }

    // TODO Add this to deserialization plugins
    if (element.nodeName === "BODY") {
        return jsx("fragment", {}, children);
    }

    if (element.nodeName === "BR") {
        return "\n";
    }

    if (element.nodeName === "P") {
        return jsx("element", { type: "paragraph" }, children);
    }

    if (element.nodeName === "LI") {
        return jsx("element", { type: "list-item" }, children);
    }

    if (element.nodeName === "OL") {
        return jsx("element", { type: "numbered-list" }, children);
    }

    const elementProps = deserializeInlines(element, {}, plugins);
    return { text: element.textContent, ...elementProps };
};

export const deserializeElements = (element: Node, children: any, plugins: SlatePluginsType): any => {
    return plugins.reduce((result, plugin) => {
        if (typeof result === "undefined" && typeof plugin.deserializeElement !== "undefined") {
            return plugin.deserializeElement(element, children);
        }

        return result;
    }, undefined);
};

export const deserializeInlines = (
    element: Element,
    elementProps: DeserializeElementPropsInterface,
    plugins: SlatePluginsType
): DeserializeElementPropsInterface => {
    return plugins.reduce((elementProps, plugin) => {
        if (typeof plugin.deserializeInline !== "undefined") {
            return plugin.deserializeInline(element, elementProps);
        }

        return elementProps;
    }, elementProps);
};

export const serialize = (node: any, plugins: SlatePluginsType): undefined | string => {
    if (Text.isText(node)) {
        let result: SerializeInlineResultInteface = {
            text: escapeHtml(node.text),
            attributes: {},
            styles: {},
        };

        result = serializeInlines(node, result, plugins);

        let style = "";
        const hasStyles = Object.keys(result.styles).length > 0;
        if (hasStyles) {
            const styleList = Object.entries(result.styles).map(([style, value]) => {
                return style + ": " + value + ";";
            });
            style = " style='" + styleList.join(" ") + "'";
        }

        let attribute = "";
        const hasAttributes = Object.keys(result.attributes).length > 0;
        if (hasAttributes) {
            const attributeList = Object.entries(result.attributes).map(([attribute, value]) => {
                if (value === false) {
                    return "";
                }

                if (value === true) {
                    return attribute;
                }

                return attribute + "=" + value;
            });
            attribute = " " + attributeList.join(" ");
        }

        let component = undefined;

        if ((hasStyles || hasAttributes) && typeof component === "undefined") {
            component = "span";
        }

        if (component) {
            return "<" + component + style + attribute + ">" + result.text + "</" + component + ">";
        }

        return result.text;
    }

    const children = node.children.map((nodeChild) => serialize(nodeChild, plugins)).join("");

    // TODO Add this to deserializetion plugin
    switch (node.type) {
        case "quote":
            return `<blockquote><p>${children}</p></blockquote>`;
        case "paragraph":
            console.log("a");
            return `<p>${children}</p>`;
        case "list-item":
            return `<li>${children}</li>`;
        case "numbered-list":
            return `<ol>${children}</ol>`;
        case "link":
            return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    }

    return serializeElements(node, children, plugins);
};

export const serializeInlines = (
    element: any,
    result: SerializeInlineResultInteface,
    plugins: SlatePluginsType
): SerializeInlineResultInteface => {
    return plugins.reduce((result, plugin) => {
        if (typeof plugin.serializeInline !== "undefined") {
            return plugin.serializeInline(element, result);
        }

        return result;
    }, result);
};

export const serializeElements = (node: any, children: string, plugins: SlatePluginsType): string => {
    const result = plugins.reduce((result: undefined | string, plugin) => {
        if (typeof result === "undefined" && typeof plugin.serializeElement !== "undefined") {
            return plugin.serializeElement(node, children);
        }

        return result;
    }, undefined);

    if (typeof result === "undefined") {
        return children;
    }

    return result;
};
