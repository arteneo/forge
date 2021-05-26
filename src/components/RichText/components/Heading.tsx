import React from "react";
import { Check, RemoveCircle, Title } from "@material-ui/icons";
import { Button, Grid, Popover } from "@material-ui/core";
import { RichUtils, convertFromRaw } from "draft-js";

const HeadingAtomicBlock = (props) => {
    console.log("🚀 ~ file: Heading.tsx ~ line 26 ~ HeadingAtomicBlock ~ props", props);
    return <h1>abc</h1>;
};

const headingAtomicControl = {
    name: "heading-atomic",
    type: "atomic",
    atomicComponent: HeadingAtomicBlock,
};

const headingControl = (setAnchor) => {
    return {
        name: "heading",
        icon: <Title />,
        type: "callback",
        onClick: (_editorState, _name, anchor) => {
            setAnchor(anchor);
        },
    };
};

const HeadingPopover = ({ anchor, close, submit }) => {
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
            <Grid container item xs={12} direction="row" justify="flex-end">
                <Button onClick={() => submit("H1")}>
                    <Check />
                </Button>
                <Button onClick={() => submit("H2")}>
                    <Check />
                </Button>
                <Button onClick={() => submit("h3")}>
                    <Check />
                </Button>
            </Grid>
            <Grid container item xs={12} direction="row" justify="flex-end">
                <Button onClick={() => close()}>
                    <RemoveCircle />
                </Button>
            </Grid>
        </Popover>
    );
};

export { headingControl, headingAtomicControl, HeadingAtomicBlock, HeadingPopover };
