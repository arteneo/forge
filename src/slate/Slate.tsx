import React from "react";
import { BaseEditor, createEditor, Descendant, Text } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import {
    ReactEditor,
    Slate as SlateReact,
    Editable,
    withReact,
    RenderLeafProps,
    RenderElementProps,
} from "slate-react";
import { jsx } from "slate-hyperscript";
import Toolbar from "@arteneo/forge/slate/components/Toolbar";
import ClearButton from "@arteneo/forge/slate/components/ClearButton";
import UndoButton from "@arteneo/forge/slate/components/UndoButton";
import RedoButton from "@arteneo/forge/slate/components/RedoButton";
import escapeHtml from "escape-html";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { boldLeaf, boldSerializeInline, boldDeserializeInline, BoldButton } from "@arteneo/forge/slate/plugins/Bold";
import {
    italicLeaf,
    italicSerializeInline,
    italicDeserializeInline,
    ItalicButton,
} from "@arteneo/forge/slate/plugins/Italic";
import {
    underlineLeaf,
    underlineSerializeInline,
    underlineDeserializeInline,
    UnderlineButton,
} from "@arteneo/forge/slate/plugins/Underline";
import {
    strikethroughLeaf,
    strikethroughSerializeInline,
    strikethroughDeserializeInline,
    StrikethroughButton,
} from "@arteneo/forge/slate/plugins/Strikethrough";
import {
    colorLeaf,
    colorSerializeInline,
    colorDeserializeInline,
    ColorButton,
} from "@arteneo/forge/slate/plugins/Color";
import {
    headingElement,
    headingSerializeElement,
    headingDeserializeElement,
    HeadingButton,
} from "@arteneo/forge/slate/plugins/Heading";
import {
    unorderedListElement,
    unorderedListSerializeElement,
    unorderedListDeserializeElement,
    UnorderedListButton,
} from "@arteneo/forge/slate/plugins/UnorderedList";
import {
    orderedListElement,
    orderedListSerializeElement,
    orderedListDeserializeElement,
    OrderedListButton,
} from "@arteneo/forge/slate/plugins/OrderedList";

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
    type: "paragraph";
    children: CustomText[];
};

export type HeadingElement = {
    type: "heading";
    level: number;
    children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement;

export type FormattedText = { text: string };

export type ColoredText = { text: string; color?: React.CSSProperties };

export type CustomText = FormattedText | ColoredText;

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const Leaf = ({ attributes, children, leaf, text }: RenderLeafProps) => {
    children = boldLeaf({ attributes, children, leaf, text });
    children = italicLeaf({ attributes, children, leaf, text });
    children = underlineLeaf({ attributes, children, leaf, text });
    children = strikethroughLeaf({ attributes, children, leaf, text });
    children = colorLeaf({ attributes, children, leaf, text });

    return <span {...attributes}>{children}</span>;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
    let result = headingElement({ attributes, children, element });
    if (typeof result !== "undefined") {
        return result;
    }

    result = unorderedListElement({ attributes, children, element });
    if (typeof result !== "undefined") {
        return result;
    }

    result = orderedListElement({ attributes, children, element });
    if (typeof result !== "undefined") {
        return result;
    }

    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const initialValueHTML =
    "<p><span style='color: rgb(19, 8, 142)' data-strong><strong>TEST</strong></span></p><ol><li><span style='color: rgb(19, 8, 142)' data-strong><strong>STRON</strong></span><span style='color: rgb(179, 1, 179)' data-strong><strong>G</strong></span><span style='color: rgb(179, 1, 179)' data-strong data-italic><em><strong>I</strong></em></span><span style='color: rgb(52, 159, 30)' data-italic><em>TA</em></span><span style='color: rgb(138, 126, 48)' data-italic><em>LIC</em></span><span style='color: rgb(138, 126, 48)' data-strong data-italic><em><strong>S</strong></em></span><span style='color: rgb(138, 126, 48)' data-strong><strong>TR</strong></span><span style='color: rgb(74, 5, 5)' data-strong><strong>ONG</strong></span></li><li><span style='color: rgb(74, 5, 5)' data-strong><strong>ABC</strong></span></li><li><span style='color: rgb(74, 5, 5)' data-strong><strong>DEF</strong></span></li></ol><p><span style='color: rgb(74, 5, 5)' data-strong><strong>TEST 2</strong></span></p><ul><li><span style='color: rgb(74, 5, 5)' data-strong><strong>ABC</strong></span></li><li><span style='color: rgb(74, 5, 5)' data-strong><strong>DEF</strong></span></li></ul>";
const document = new DOMParser().parseFromString(initialValueHTML, "text/html");

const serialize = (node: CustomElement): React.ReactNode => {
    console.log("🚀 ~ file: Slate.tsx ~ line 110 ~ node", node);

    if (Text.isText(node)) {
        const serializeInlineResult: SerializeInlineResult = {
            text: escapeHtml(node.text),
            attributes: {},
            styles: {},
        };

        boldSerializeInline(node, serializeInlineResult);
        italicSerializeInline(node, serializeInlineResult);
        underlineSerializeInline(node, serializeInlineResult);
        strikethroughSerializeInline(node, serializeInlineResult);
        colorSerializeInline(node, serializeInlineResult);

        let style = "";
        const hasStyles = Object.keys(serializeInlineResult.styles).length > 0;
        if (hasStyles) {
            const styleList = Object.entries(serializeInlineResult.styles).map(([style, value]) => {
                return style + ": " + value + ";";
            });
            style = " style='" + styleList.join(" ") + "'";
        }

        let attribute = "";
        const hasAttributes = Object.keys(serializeInlineResult.attributes).length > 0;
        if (hasAttributes) {
            const attributeList = Object.entries(serializeInlineResult.attributes).map(([attribute, value]) => {
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
            return "<" + component + style + attribute + ">" + serializeInlineResult.text + "</" + component + ">";
        }

        return serializeInlineResult.text;
    }

    const children = node.children.map((nodeChild) => serialize(nodeChild)).join("");

    let result = headingSerializeElement(node, children);
    if (typeof result !== "undefined") {
        return result;
    }

    result = unorderedListSerializeElement(node, children);
    if (typeof result !== "undefined") {
        return result;
    }

    result = orderedListSerializeElement(node, children);
    if (typeof result !== "undefined") {
        return result;
    }

    switch (node.type) {
        // case "quote":
        //     return `<blockquote><p>${children}</p></blockquote>`;
        case "paragraph":
            return `<p>${children}</p>`;
        case "list-item":
            return `<li>${children}</li>`;
        case "numbered-list":
            return `<ol>${children}</ol>`;
        // case "link":
        //     return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    }

    return children;
};

const deserialize = (element: HTMLElement) => {
    if (element.nodeType === 3) {
        return element.textContent;
    }

    if (element.nodeType !== 1) {
        return null;
    }

    let children = Array.from(element.childNodes).map(deserialize);

    if (children.length === 0) {
        children = [{ text: "" }];
    }

    const nodeName = element.nodeName;
    if (nodeName === "BODY") {
        return jsx("fragment", {}, children);
    }

    if (nodeName === "BR") {
        return "\n";
    }

    if (nodeName === "P") {
        return jsx("element", { type: "paragraph" }, children);
    }

    let result = headingDeserializeElement(element, children);
    if (typeof result !== "undefined") {
        return result;
    }

    result = unorderedListDeserializeElement(element, children);
    if (typeof result !== "undefined") {
        return result;
    }

    result = orderedListDeserializeElement(element, children);
    if (typeof result !== "undefined") {
        return result;
    }

    if (nodeName === "LI") {
        return jsx("element", { type: "list-item" }, children);
    }

    if (nodeName === "OL") {
        return jsx("element", { type: "numbered-list" }, children);
    }

    const elementProps: DeserializeElementPropsInterface = {};
    boldDeserializeInline(element, elementProps);
    italicDeserializeInline(element, elementProps);
    underlineDeserializeInline(element, elementProps);
    strikethroughDeserializeInline(element, elementProps);
    colorDeserializeInline(element, elementProps);

    return { text: element.textContent, ...elementProps };
};

const Slate = () => {
    const editor = React.useMemo(() => withHistory(withReact(createEditor())), []);
    // const editor = React.useMemo(() => withHistory(withReact(createEditor())), []);
    const initialValue = deserialize(document.body);
    // console.log("🚀 ~ file: Slate.tsx ~ line 208 ~ Slate ~ initialValue", initialValue);
    const [value, setValue] = React.useState<CustomElement[]>(initialValue);
    console.log("🚀 ~ file: Slate.tsx ~ line 210 ~ Slate ~ value", value);
    // console.log("🚀 ~ file: Slate.tsx ~ line 188 ~ Slate ~ deserialize(document.body)", deserialize(document.body));
    // const [value, setValue] = React.useState<CustomElement[]>(initialValue);

    const renderElement = React.useCallback((props) => <Element {...props} />, []);
    const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);

    const onChange = (change: Descendant[]) => {
        setValue(change as CustomElement[]);
    };

    return (
        <>
            <h1>Test</h1>

            <SlateReact
                {...{
                    editor,
                    value,
                    onChange,
                }}
            >
                <Toolbar>
                    <BoldButton />
                    <ItalicButton />
                    <UnderlineButton />
                    <StrikethroughButton />
                    <ColorButton />
                    <HeadingButton />
                    <UnorderedListButton />
                    <OrderedListButton />
                    <ClearButton />
                    <UndoButton />
                    <RedoButton />
                </Toolbar>
                <Editable
                    {...{
                        renderElement,
                        renderLeaf,
                    }}
                />
            </SlateReact>

            <br />
            <br />

            <code dangerouslySetInnerHTML={{ __html: initialValueHTML }} />

            <br />
            <br />

            <code>{initialValueHTML}</code>

            <br />
            <br />

            <code>
                {serialize({
                    children: value,
                })}
            </code>
        </>
    );
};

export default Slate;
