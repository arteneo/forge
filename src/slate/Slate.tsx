import React from "react";
import { BaseEditor, createEditor, Descendant, Text } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { ReactEditor, Slate as SlateReact, Editable, withReact } from "slate-react";
import { jsx } from "slate-hyperscript";
import Toolbar from "@arteneo/forge/slate/components/Toolbar";
import MarkButton from "@arteneo/forge/slate/components/MarkButton";
import BlockButton from "@arteneo/forge/slate/components/BlockButton";
import ColorButton from "@arteneo/forge/slate/components/ColorButton";
import ClearButton from "@arteneo/forge/slate/components/ClearButton";
import UndoButton from "@arteneo/forge/slate/components/UndoButton";
import RedoButton from "@arteneo/forge/slate/components/RedoButton";
import { FormatBold, FormatItalic, FormatListNumbered, FormatListBulleted, Title } from "@material-ui/icons";
import escapeHtml from "escape-html";

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

const Leaf = ({ attributes, children, leaf }) => {
    // console.log("🚀 ~ file: Slate.tsx ~ line 43 ~ Leaf ~ attributes", attributes);
    // console.log("🚀 ~ file: Slate.tsx ~ line 43 ~ Leaf ~ leaf", leaf);
    if (leaf.bold) {
        children = <strong {...attributes}>{children}</strong>;
    }

    if (leaf.code) {
        children = <code {...attributes}>{children}</code>;
    }

    if (leaf.italic) {
        children = <em {...attributes}>{children}</em>;
    }

    if (leaf.underline) {
        children = <u {...attributes}>{children}</u>;
    }

    if (leaf["color"]) {
        if (typeof attributes?.style === "undefined") {
            attributes.style = {};
        }

        attributes.style["color"] = leaf["color"];
    }
    // console.log("🚀 ~ file: Slate.tsx ~ line 67 ~ Leaf ~ attributes", attributes);

    return <span {...attributes}>{children}</span>;
};

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "heading-three":
            return <h3 {...attributes}>{children}</h3>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

// ~ file: Slate.tsx ~ line 110 ~ node {text: "STRONG", color: "#2101F6", bold: true}
// Slate.tsx:117 🚀 ~ file: Slate.tsx ~ line 110 ~ node {color: "#42F601", text: "ITA", italic: true}
// Slate.tsx:117 🚀 ~ file: Slate.tsx ~ line 110 ~ node {color: "#42F601", italic: true, text: "LIC", bold: true}
// Slate.tsx:117 🚀 ~ file: Slate.tsx ~ line 110 ~ node {color: "#E10606", text: "STRONG", bold: true}

// const initialValueHTML = "<h3>A line of text</h3><p> in a parag</p><h3>asdad</h3><p></p><p><strong>raph.</strong></p>";
// const initialValueHTML = "<h3>A l<em>ine o</em>f text</h3><p> in a parag</p><h3><strong>as</strong><em><strong>da</strong></em>d</h3><p></p><p><strong>raph.</strong></p>";
// const initialValueHTML =
//     "<h3>A l<em>ine o</em>f text</h3><p><span style='color: #980C0C'> in a parag</span></p><h3><strong>as</strong><em>da</em>d</h3><p></p><p><strong>raph.</strong></p>";
// const initialValueHTML =
//     "<h3>A l<em>ine o</em>f text</h3><p><span style='color: rgb(152, 12, 12)'> in a </span><span style='color: #205EC1'>p</span><span style='color: #205EC1'><strong>ara</strong></span><span style='color: rgb(152, 12, 12)'><strong>g</strong></span></p><h3><strong>as</strong><em>da</em>d</h3><p></p><p><strong>raph.</strong></p>";
// const initialValueHTML =
//     "<p><span style='color: #205EC1'><strong>STRONG COLOR</strong></span><span style='color: rgb(152, 12, 12)'><strong>STRONG OTHER COLOR</strong></span></p>";
// const initialValueHTML =
//     "<p><strong color: rgb(32, 94, 193)>STRONG CO<strong/><strong color: #169836>LORSTR<strong/><strong color: rgb(152, 12, 12)>ONG OTHER COLOR<strong/></p>";
// const initialValueHTML =
//     "<p><strong style='color: rgb(19, 8, 142)'>STRONG</strong><em style='color: rgb(52, 159, 30)'>ITALIC</em><strong style='color: rgb(74, 5, 5)'>STRONG</strong></p>";
// const initialValueHTML =
//     "<p><span style='color: rgb(19, 8, 142)' data-strong><strong>STRON</strong></span><span style='color: rgb(179, 1, 179)' data-strong><strong>G</strong></span><span style='color: rgb(179, 1, 179)' data-strong data-italic><em><strong>I</strong></em></span><span style='color: rgb(52, 159, 30)' data-italic><em>TA</em></span><span style='color: rgb(138, 126, 48)' data-italic><em>LIC</em></span><span style='color: rgb(138, 126, 48)' data-strong data-italic><em><strong>S</strong></em></span><span style='color: rgb(138, 126, 48)' data-strong><strong>TR</strong></span><span style='color: rgb(74, 5, 5)' data-strong><strong>ONG</strong></span></p>";
const initialValueHTML =
    "<p><span style='color: rgb(19, 8, 142)' data-strong><strong>TEST</strong></span></p><ol><li><span style='color: rgb(19, 8, 142)' data-strong><strong>STRON</strong></span><span style='color: rgb(179, 1, 179)' data-strong><strong>G</strong></span><span style='color: rgb(179, 1, 179)' data-strong data-italic><em><strong>I</strong></em></span><span style='color: rgb(52, 159, 30)' data-italic><em>TA</em></span><span style='color: rgb(138, 126, 48)' data-italic><em>LIC</em></span><span style='color: rgb(138, 126, 48)' data-strong data-italic><em><strong>S</strong></em></span><span style='color: rgb(138, 126, 48)' data-strong><strong>TR</strong></span><span style='color: rgb(74, 5, 5)' data-strong><strong>ONG</strong></span></li><li><span style='color: rgb(74, 5, 5)' data-strong><strong>ABC</strong></span></li><li><span style='color: rgb(74, 5, 5)' data-strong><strong>DEF</strong></span></li></ol><p><span style='color: rgb(74, 5, 5)' data-strong><strong>TEST 2</strong></span></p><ul><li><span style='color: rgb(74, 5, 5)' data-strong><strong>ABC</strong></span></li><li><span style='color: rgb(74, 5, 5)' data-strong><strong>DEF</strong></span></li></ul>";
// console.log("🚀 ~ file: Slate.tsx ~ line 81 ~ initialValueHTML", initialValueHTML);
const document = new DOMParser().parseFromString(initialValueHTML, "text/html");
// console.log("🚀 ~ file: Slate.tsx ~ line 83 ~ document", document);

// const initialValue: CustomElement[] = [
//     {
//         type: "paragraph",
//         children: [{ text: "A line of text in a paragraph." }],
//     },
// ];

const serialize = (node: CustomElement): React.ReactNode => {
    console.log("🚀 ~ file: Slate.tsx ~ line 110 ~ node", node);

    if (Text.isText(node)) {
        let string = escapeHtml(node.text);

        let attributes: string[] = [];

        let styles: string[] = [];
        if (node.color) {
            styles.push("color: " + node.color);
        }

        let component = undefined;

        if (node.bold) {
            attributes.push("data-strong");
            if (typeof component === "undefined") {
                string = "<strong>" + string + "</strong>";
            } else {
                component = "strong";
            }
        }
        if (node.italic) {
            attributes.push("data-italic");
            if (typeof component === "undefined") {
                string = "<em>" + string + "</em>";
            } else {
                component = "em";
            }
        }

        let style = "";
        if (styles.length > 0) {
            style = " style='" + styles.join("; ") + "'";
        }

        let attribute = "";
        if (attributes.length > 0) {
            attribute = " " + attributes.join(" ");
        }

        if ((style || attribute) && typeof component === "undefined") {
            component = "span";
        }

        if (component) {
            return "<" + component + style + attribute + ">" + string + "</" + component + ">";
        }

        return string;
    }

    const children = node.children.map((n) => serialize(n)).join("");

    switch (node.type) {
        // case "quote":
        //     return `<blockquote><p>${children}</p></blockquote>`;
        case "paragraph":
            return `<p>${children}</p>`;
        case "heading-three":
            return `<h3>${children}</h3>`;
        case "list-item":
            return `<li>${children}</li>`;
        case "numbered-list":
            return `<ol>${children}</ol>`;
        case "bulleted-list":
            return `<ul>${children}</ul>`;
        // case "link":
        //     return `<a href="${escapeHtml(node.url)}">${children}</a>`;
        default:
            return children;
    }
};

const deserialize = (el: HTMLElement) => {
    if (el.nodeType === 3) {
        return el.textContent;
    } else if (el.nodeType !== 1) {
        return null;
    }

    let children = Array.from(el.childNodes).map(deserialize);

    if (children.length === 0) {
        children = [{ text: "" }];
    }

    let textProps: any = {};
    // console.log("🚀 ~ file: Slate.tsx ~ line 180 ~ deserialize ~ el", el);
    // console.log("🚀 ~ file: Slate.tsx ~ line 180 ~ deserialize ~ el.style", el.style);
    // console.log("🚀 ~ file: Slate.tsx ~ line 180 ~ deserialize ~ el.nodeName", el.nodeName);
    if (el.style?.color) {
        textProps["color"] = el.style?.color;
    }

    // console.log("🚀 ~ file: Slate.tsx ~ line 214 ~ deserialize ~ string", el.getAttribute("data-strong"));
    if (el.hasAttribute("data-strong")) {
        textProps["bold"] = true;
    }

    if (el.hasAttribute("data-italic")) {
        textProps["italic"] = true;
    }
    // console.log("🚀 ~ file: Slate.tsx ~ line 219 ~ deserialize ~ textProps", textProps);

    let result;

    switch (el.nodeName) {
        case "BODY":
            result = jsx("fragment", {}, children);
            break;
        case "BR":
            result = "\n";
            break;
        case "BLOCKQUOTE":
            result = jsx("element", { type: "quote" }, children);
            break;
        case "P":
            result = jsx("element", { type: "paragraph" }, children);
            break;
        case "H3":
            result = jsx("element", { type: "heading-three" }, children);
            break;
        case "A":
            result = jsx("element", { type: "link", url: el.getAttribute("href") }, children);
            break;
        case "LI":
            result = jsx("element", { type: "list-item" }, children);
            break;
        case "UL":
            result = jsx("element", { type: "bulleted-list" }, children);
            break;
        case "OL":
            result = jsx("element", { type: "numbered-list" }, children);
            break;
        case "STRONG":
            result = { text: el.textContent, bold: true, ...textProps };
            break;
        case "EM":
            result = { text: el.textContent, italic: true, ...textProps };
            break;
        default:
            result = { text: el.textContent, ...textProps };
            break;
    }

    // console.log("🚀 ~ file: Slate.tsx ~ line 238 ~ deserialize ~ result", result);
    return result;
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
                    <MarkButton format="bold">
                        <FormatBold />
                    </MarkButton>
                    <MarkButton format="italic">
                        <FormatItalic />
                    </MarkButton>
                    <BlockButton format="heading-three">
                        <Title />
                    </BlockButton>
                    <ColorButton />
                    <BlockButton format="numbered-list">
                        <FormatListNumbered />
                    </BlockButton>
                    <BlockButton format="bulleted-list">
                        <FormatListBulleted />
                    </BlockButton>
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
