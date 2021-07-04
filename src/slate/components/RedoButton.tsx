import React from "react";
import { useSlate } from "slate-react";
import { IconButton, IconButtonProps } from "@material-ui/core";
import { Redo } from "@material-ui/icons";

interface RedoButtonProps extends IconButtonProps {}

const RedoButton = ({ ...iconButtonProps }: RedoButtonProps) => {
    const editor = useSlate();

    const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        editor.redo();
    };

    return (
        <IconButton
            {...{
                // TODO
                // active: undefined,
                onMouseDown,
                children: <Redo />,
                ...iconButtonProps,
            }}
        />
    );
};

export default RedoButton;
export { RedoButtonProps };
