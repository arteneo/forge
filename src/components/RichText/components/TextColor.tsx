import React from "react";
import { FormatColorText } from "@material-ui/icons";
import { Box, Popover, makeStyles, ClickAwayListener } from "@material-ui/core";
import { EditorState } from "draft-js";
import { TMUIRichTextEditorRef, TCustomControl } from "@arteneo/mui-rte";
import { ColorBox, Color } from "material-ui-color";

const textColorControl = (setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>): TCustomControl => {
    return {
        name: "textColor",
        icon: <FormatColorText />,
        type: "callback",
        onClick: (_editorState: EditorState, _name: string, anchor: HTMLElement | null) => {
            setAnchor(anchor);
        },
    };
};

const useStyles = makeStyles(() => ({
    content: {
        maxWidth: 320,
    },
    one: {
        fontSize: 22,
    },
    two: {
        fontSize: 20,
    },
    three: {
        fontSize: 18,
    },
    four: {
        fontSize: 16,
    },
    five: {
        fontSize: 14,
    },
    six: {
        fontSize: 12,
    },
}));

interface TextColorPopoverInterface {
    // eslint-disable-next-line
    styles: any;
    anchor?: HTMLElement;
    close: () => void;
    muiRteRef: React.RefObject<TMUIRichTextEditorRef>;
}

type TextColorType = "one" | "two" | "three" | "four" | "five" | "six";

const TextColorPopover = ({ styles, anchor, close, muiRteRef }: TextColorPopoverInterface) => {
    const classes = useStyles();

    const [color, setColor] = React.useState<undefined | Color>(undefined);

    const updateTextColor = (color: Color) => {
        if (color?.format === "unknown") {
            // This means there is an error
            return;
        }

        if (typeof muiRteRef.current !== "undefined") {
            muiRteRef.current?.setEditorState((editorState) => {
                const hexColor = "#" + color.hex;
                return styles.color.add(editorState, hexColor);
            });
        }
    };

    const onChange = (color: Color) => {
        setColor(color);
        updateTextColor(color);
    };

    return (
        <Popover
            open={anchor !== undefined}
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
                <ClickAwayListener onClickAway={close}>
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
    );
};

export { textColorControl, TextColorPopover, TextColorPopoverInterface, TextColorType };
