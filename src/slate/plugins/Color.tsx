import React from "react";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { RenderLeafProps, useSlate } from "slate-react";
import { IconButton, IconButtonProps, Box, Popover, makeStyles, ClickAwayListener } from "@material-ui/core";
import { toggleMark } from "@arteneo/forge/slate/utils/slate";
import { FormatColorText } from "@material-ui/icons";
import { ColorBox, Color } from "material-ui-color";

// const boldPlugin = {
//     button: BoldButton,
// }

// TODO Typings
const colorSerializeInline = (node: any, result: SerializeInlineResult): void => {
    if (node.color) {
        result.styles["color"] = node.color;
    }
};

const colorDeserializeInline = (element: HTMLElement, elementProps: DeserializeElementPropsInterface): void => {
    if (element.style?.color) {
        elementProps["color"] = element.style?.color;
    }
};

const colorLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.color) {
        if (typeof attributes?.style === "undefined") {
            attributes.style = {};
        }

        attributes.style["color"] = leaf["color"];
    }

    return children;
};

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
        setColor(color);

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

export { colorLeaf, colorSerializeInline, colorDeserializeInline, ColorButton, ColorButtonProps };
