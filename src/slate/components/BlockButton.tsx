import React from "react";
import { useSlate } from "slate-react";
import { IconButton, IconButtonProps } from "@material-ui/core";
import { toggleBlock } from "@arteneo/forge/slate/utils/slate";

interface BlockButtonProps extends IconButtonProps {
    format: string;
}

const BlockButton = ({ format, ...iconButtonProps }: BlockButtonProps) => {
    const editor = useSlate();

    const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        toggleBlock(editor, format);
    };

    return (
        <IconButton
            {...{
                onMouseDown,
                ...iconButtonProps,
            }}
        />
    );
};

export default BlockButton;
export { BlockButtonProps };
