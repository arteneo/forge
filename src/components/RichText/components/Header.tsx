import React from "react";
import { Title } from "@material-ui/icons";
import { Button, Box, Popover, makeStyles, ClickAwayListener } from "@material-ui/core";
import { RichUtils } from "draft-js";
import { useTranslation } from "react-i18next";

const headerControl = (setAnchor) => {
    return {
        name: "header",
        icon: <Title />,
        type: "callback",
        onClick: (_editorState, _name, anchor) => {
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

type HeaderType = "one" | "two" | "three" | "four" | "five" | "six";

const HeaderPopover = ({ anchor, close, muiRteRef }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const toggleBlockType = (blockType: HeaderType) => {
        muiRteRef.current?.setEditorState((editorState) => {
            return RichUtils.toggleBlockType(editorState, "header-" + blockType);
        });
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

export { headerControl, HeaderPopover };
