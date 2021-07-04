import React from "react";
import { useSlate } from "slate-react";
import { IconButton, IconButtonProps, Box, Popover, makeStyles, ClickAwayListener } from "@material-ui/core";
import { toggleMark } from "@arteneo/forge/slate/utils/slate";
import { FormatColorText } from "@material-ui/icons";
import { ColorBox, Color } from "material-ui-color";

interface ColorButtonProps extends IconButtonProps {
    format?: string;
}

const useStyles = makeStyles(() => ({
    content: {
        maxWidth: 320,
    },
}));

const ColorButton = ({ format = "color", ...iconButtonProps }: ColorButtonProps) => {
    const classes = useStyles();
    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
    const [color, setColor] = React.useState<undefined | Color>(undefined);

    const editor = useSlate();

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget);
    };

    const onChange = (color: Color) => {
        // e.preventDefault();
        // toggleMark(editor, format);
        setColor(color);
        // updateTextColor(color);

        if (color?.format === "unknown") {
            // This means there is an error
            return;
        }

        toggleMark(editor, format, "#" + color.hex);
    };

    const onClose = () => {
        setAnchor(null);
    };

    return (
        <>
            <IconButton
                {...{
                    // TODO
                    // active: undefined,
                    onClick,
                    children: <FormatColorText />,
                    ...iconButtonProps,
                }}
            />
            <Popover
                open={anchor !== null}
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <div className={classes.content}>
                    <ClickAwayListener onClickAway={onClose}>
                        <Box>
                            <ColorBox
                                {...{
                                    value: color,
                                    onChange,
                                }}
                            />
                        </Box>
                    </ClickAwayListener>
                </div>
            </Popover>
        </>
    );
};

export default ColorButton;
export { ColorButtonProps };
