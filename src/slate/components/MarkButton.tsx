import React from "react";
import { useSlate } from "slate-react";
import { IconButton, IconButtonProps } from "@material-ui/core";

interface MarkButtonProps extends IconButtonProps {
    // TODO
    format: any;
}

const MarkButton = ({ format, ...iconButtonProps }: MarkButtonProps) => {
    const editor = useSlate();

    const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        console.log("🚀 ~ file: MarkButton.tsx ~ line 17 ~ onMouseDown ~ e", e);
        // event.preventDefault();
        // toggleMark(editor, format);
    };

    return (
        <IconButton
            {...{
                // TODO
                // active: undefined,
                onMouseDown,
                ...iconButtonProps,
            }}
        />
    );
};

export default MarkButton;
export { MarkButtonProps };
