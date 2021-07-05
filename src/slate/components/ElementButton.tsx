import React from "react";
import { useSlate } from "slate-react";
import { IconButton, IconButtonProps } from "@material-ui/core";
import { toggleElement } from "@arteneo/forge/slate/utils/slate";

interface ElementButtonProps extends IconButtonProps {
    format: string;
}

const ElementButton = ({ format, ...iconButtonProps }: ElementButtonProps) => {
    const editor = useSlate();

    const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        toggleElement(editor, format);
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

export default ElementButton;
export { ElementButtonProps };
