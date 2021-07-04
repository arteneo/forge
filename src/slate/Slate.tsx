import React from "react";
import { BaseEditor, createEditor, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, Slate as SlateReact, Editable, withReact } from "slate-react";
import Toolbar from "@arteneo/forge/slate/components/Toolbar";
import MarkButton from "@arteneo/forge/slate/components/MarkButton";

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
const initialValue: CustomElement[] = [
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }],
    },
];

const Slate = () => {
    const editor = React.useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = React.useState<CustomElement[]>(initialValue);

    const onChange = (change: Descendant[]) => {
        console.log("🚀 ~ file: Test.tsx ~ line 39 ~ onChange ~ newValue", change);
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
                    <MarkButton format="bold">ABC</MarkButton>
                </Toolbar>
                <Editable />
            </SlateReact>
        </>
    );
};

export default Slate;
