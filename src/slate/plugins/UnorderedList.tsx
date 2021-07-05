import React from "react";
import { IconButton, IconButtonProps, Box, Popover, makeStyles, ClickAwayListener, Button } from "@material-ui/core";
import { FormatListBulleted } from "@material-ui/icons";
import SerializeInlineResult from "@arteneo/forge/slate/definitions/SerializeInlineResult";
import DeserializeElementPropsInterface from "@arteneo/forge/slate/definitions/DeserializeElementPropsInterface";
import { RenderElementProps, useSlate } from "slate-react";
import { toggleBlock } from "@arteneo/forge/slate/utils/slate";
import { useTranslation } from "react-i18next";
import { jsx } from "slate-hyperscript";
import BlockButton, { BlockButtonProps } from "@arteneo/forge/slate/components/BlockButton";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";

// const boldPlugin = {
//     button: BoldButton,
// }

// TODO Typings
const unorderedListSerializeElement = (node: any, children: any): void | string => {
    if (node.type === "unordered-list") {
        return "<ul>" + children + "</ul>";
    }
};

const unorderedListDeserializeElement = (element: HTMLElement, children: any): void | CustomElement => {
    if (element.nodeName === "UL") {
        return jsx("element", { type: "unordered-list" }, children);
    }
};

const unorderedListElement = ({ attributes, children, element }: RenderElementProps): void | React.ReactNode => {
    switch (element.type) {
        case "unordered-list":
            return <ul {...attributes}>{children}</ul>;
    }
};

type UnorderedListButtonProps = Optional<BlockButtonProps, "format">;

const UnorderedListButton = ({ ...elementButtonProps }: UnorderedListButtonProps) => {
    return (
        <BlockButton
            {...{
                format: "strikethrough",
                children: <FormatListBulleted />,
                ...elementButtonProps,
            }}
        />
    );
};

export {
    unorderedListElement,
    unorderedListSerializeElement,
    unorderedListDeserializeElement,
    UnorderedListButton,
    UnorderedListButtonProps,
};
