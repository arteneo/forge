import React from "react";
import { FormatSize } from "@material-ui/icons";
import { Box, Button, Popover, makeStyles, ClickAwayListener } from "@material-ui/core";
import { EditorState, RichUtils } from "draft-js";
import { useTranslation } from "react-i18next";
import { TMUIRichTextEditorRef, TCustomControl } from "@arteneo/mui-rte";

const fontSizeControl = (setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>): TCustomControl => {
    return {
        name: "fontSize",
        icon: <FormatSize />,
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
}));

interface FontSizePopoverInterface {
    anchor?: HTMLElement;
    close: () => void;
    muiRteRef: React.RefObject<TMUIRichTextEditorRef>;
    fontSizes?: number[];
}

const FontSizePopover = ({
    anchor,
    close,
    muiRteRef,
    fontSizes = [10, 12, 14, 18, 22, 26],
}: FontSizePopoverInterface) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const toggleInlineStyle = (fontSize: number) => {
        if (typeof muiRteRef.current !== "undefined") {
            muiRteRef.current?.setEditorState((editorState) => {
                return RichUtils.toggleInlineStyle(editorState, "FONTSIZE_" + fontSize + "px");
            });
        }

        close();
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
                        {fontSizes.map((fontSize) => (
                            <Button
                                key={fontSize}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    toggleInlineStyle(fontSize);
                                }}
                                fullWidth
                                style={{ fontSize: fontSize }}
                            >
                                {t("cms.muiRte.fontSize", { fontSize })}
                            </Button>
                        ))}
                    </Box>
                </ClickAwayListener>
            </div>
        </Popover>
    );
};

export { fontSizeControl, FontSizePopover, FontSizePopoverInterface };
