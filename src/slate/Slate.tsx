import React from "react";
import { BaseEditor, createEditor, Descendant, Text } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, Slate as SlateReact, Editable, withReact } from "slate-react";
import { jsx } from "slate-hyperscript";
import Toolbar from "@arteneo/forge/slate/components/Toolbar";
import MarkButton from "@arteneo/forge/slate/components/MarkButton";
import BlockButton from "@arteneo/forge/slate/components/BlockButton";
import { FormatBold, FormatItalic, Title } from "@material-ui/icons";
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

export type CustomText = FormattedText;

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const Leaf = ({ attributes, children, leaf }) => {
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

// const initialValueHTML = "<h3>A line of text</h3><p> in a parag</p><h3>asdad</h3><p></p><p><strong>raph.</strong></p>";
const initialValueHTML = "<h3>A l<em>ine o</em>f text</h3><p> in a parag</p><h3><strong>as</strong><em><strong>da</strong></em>d</h3><p></p><p><strong>raph.</strong></p>";
console.log("🚀 ~ file: Slate.tsx ~ line 81 ~ initialValueHTML", initialValueHTML);
const document = new DOMParser().parseFromString(initialValueHTML, "text/html");
console.log("🚀 ~ file: Slate.tsx ~ line 83 ~ document", document);

const initialValue: CustomElement[] = [
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }],
    },
];

const serialize = (node: CustomElement): React.ReactNode => {
    if (Text.isText(node)) {
        let string = escapeHtml(node.text);
        if (node.bold) {
            string = `<strong>${string}</strong>`;
        }
        if (node.italic) {
            string = `<em>${string}</em>`;
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
        // case "link":
        //     return `<a href="${escapeHtml(node.url)}">${children}</a>`;
        default:
            return children;
    }
};

const deserialize = (el: HTMLDocument) => {
    console.log("🚀 ~ file: Slate.tsx ~ line 118 ~ deserialize ~ el", el);
    if (el.nodeType === 3) {
        return el.textContent;
    } else if (el.nodeType !== 1) {
        return null;
    }

    let children = Array.from(el.childNodes).map(deserialize);

    if (children.length === 0) {
        children = [{ text: "" }];
    }

    switch (el.nodeName) {
        case "BODY":
            return jsx("fragment", {}, children);
        case "BR":
            return "\n";
        case "BLOCKQUOTE":
            return jsx("element", { type: "quote" }, children);
        case "P":
            return jsx("element", { type: "paragraph" }, children);
        case "H3":
            return jsx("element", { type: "heading-three" }, children);
        case "A":
            return jsx("element", { type: "link", url: el.getAttribute("href") }, children);
        case "STRONG":
            return { text: el.textContent, bold: true };
        case "EM":
            return { text: el.textContent, italic: true };
        default:
            return el.textContent;
    }
};

const Slate = () => {
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = React.useState<CustomElement[]>(deserialize(document.body));
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
                </Toolbar>
                <Editable
                    {...{
                        renderElement,
                        renderLeaf,
                    }}
                />
            </SlateReact>

            <code>
                {serialize({
                    children: value,
                })}
            </code>
        </>
    );
};

export default Slate;
