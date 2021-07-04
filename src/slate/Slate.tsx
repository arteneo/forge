import React from "react";
import { BaseEditor, createEditor, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, Slate as SlateReact, Editable, withReact } from "slate-react";
import Toolbar from "@arteneo/forge/slate/components/Toolbar";
import MarkButton from "@arteneo/forge/slate/components/MarkButton";
import BlockButton from "@arteneo/forge/slate/components/BlockButton";
import { FormatBold, FormatItalic, Title } from "@material-ui/icons";

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

const initialValue: CustomElement[] = [
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }],
    },
];

const Slate = () => {
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = React.useState<CustomElement[]>(initialValue);

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
        </>
    );
};

export default Slate;
