import React from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import { IconButton, IconButtonProps } from "@material-ui/core";
import { FormatClear } from "@material-ui/icons";

interface ClearButtonProps extends IconButtonProps {}

const ClearButton = ({ ...iconButtonProps }: ClearButtonProps) => {
    const editor = useSlate();

    const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const marks = Editor.marks(editor);
        console.log("🚀 ~ file: ClearButton.tsx ~ line 15 ~ onMouseDown ~ marks", marks)
        if (marks === null) {
            return;
        }

        Object.keys(marks).forEach((mark: string) => {
            Editor.removeMark(editor, mark);
        });
    };

    return (
        <IconButton
            {...{
                // TODO
                // active: undefined,
                onMouseDown,
                children: <FormatClear />,
                ...iconButtonProps,
            }}
        />
    );
};

export default ClearButton;
export { ClearButtonProps };
