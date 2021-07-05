import React from "react";
import { useSlate } from "slate-react";
import { IconButton, IconButtonProps } from "@material-ui/core";
import { Undo } from "@material-ui/icons";

interface UndoButtonProps extends IconButtonProps {}

const UndoButton = ({ ...iconButtonProps }: UndoButtonProps) => {
    const editor = useSlate();

    const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        editor.undo();
    };

    return (
        <IconButton
            {...{
                onMouseDown,
                children: <Undo />,
                ...iconButtonProps,
            }}
        />
    );
};

export default UndoButton;
export { UndoButtonProps };
