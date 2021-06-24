import React from "react";
import { Title } from "@material-ui/icons";
import { Button, Box, Popover, makeStyles, ClickAwayListener } from "@material-ui/core";
import { EditorState, RichUtils } from "draft-js";
import { useTranslation } from "react-i18next";
import { TMUIRichTextEditorRef, TCustomControl } from "@arteneo/mui-rte";

const headerControl = (setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>): TCustomControl => {
    return {
        name: "header",
        icon: <Title />,
        type: "callback",
        onClick: (_editorState: EditorState, _name: string, anchor: HTMLElement | null) => {
            setAnchor(anchor);
        },
    };
};

const useStyles = makeStyles(() => ({
    content: {
        maxWidth: 250,
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

interface HeaderPopoverInterface {
    anchor?: HTMLElement;
    close: () => void;
    muiRteRef: React.RefObject<TMUIRichTextEditorRef>;
}

type HeaderType = "one" | "two" | "three" | "four" | "five" | "six";

const HeaderPopover = ({ anchor, close, muiRteRef }: HeaderPopoverInterface) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const toggleBlockType = (blockType: HeaderType) => {
        if (typeof muiRteRef.current !== "undefined") {
            muiRteRef.current?.setEditorState((editorState) => {
                return RichUtils.toggleBlockType(editorState, "header-" + blockType);
            });
        }

        close();
    };

    const headerTypes: HeaderType[] = ["one", "two", "three", "four", "five", "six"];

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
                        {headerTypes.map((headerType) => (
                            <Button
                                key={headerType}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    toggleBlockType(headerType);
                                }}
                                fullWidth
                                className={classes[headerType]}
                            >
                                {t("cms.muiRte.headerType." + headerType)}
                            </Button>
                        ))}
                    </Box>
                </ClickAwayListener>
            </div>
        </Popover>
    );
};

export { headerControl, HeaderPopover, HeaderPopoverInterface, HeaderType };
