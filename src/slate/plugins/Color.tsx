import React from "react";
import SerializeInlineResultInteface from "@arteneo/forge/slate/definitions/SerializeInlineResultInteface";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { RenderLeafProps, useSlate } from "slate-react";
import { IconButton, IconButtonProps, Box, Popover, makeStyles, ClickAwayListener } from "@material-ui/core";
import { toggleMark } from "@arteneo/forge/slate/utils/slate";
import { FormatColorText } from "@material-ui/icons";
import { ColorBox, Color } from "material-ui-color";
import SlatePluginInterface from "@arteneo/forge/slate/definitions/SlatePluginInterface";
import FormattedTextInterface from "@arteneo/forge/slate/definitions/FormattedTextInterface";

interface ColorInterface extends FormattedTextInterface {
    kind: "color";
    color?: string;
}

const serializeInline = (node: any, result: SerializeInlineResultInteface): SerializeInlineResultInteface => {
    if (node.color) {
        result.styles["color"] = node.color;
    }

    return result;
};

const deserializeInline = (
    element: HTMLElement,
    elementProps: DeserializeElementPropsInterface
): DeserializeElementPropsInterface => {
    if (element.style?.color) {
        elementProps["color"] = element.style?.color;
    }

    return elementProps;
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.color) {
        return (
            <span {...attributes} style={{ color: leaf.color }}>
                {children}
            </span>
        );
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

const plugin: SlatePluginInterface = {
    toolbarComponent: <ColorButton />,
    renderLeaf,
    serializeInline,
    deserializeInline,
};

export default plugin;
export { ColorInterface, renderLeaf, serializeInline, deserializeInline, ColorButton, ColorButtonProps };
