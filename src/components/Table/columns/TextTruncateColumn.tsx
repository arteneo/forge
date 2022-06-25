import React from "react";
import { getIn, isString } from "formik";
import { useTranslation } from "react-i18next";
import { Box, SxProps } from "@mui/material";
import ColumnPathInterface from "../../../components/Table/definitions/ColumnPathInterface";

interface TextTruncateColumnProps extends ColumnPathInterface {
    stripTags?: boolean;
    stripLength?: number;
    stripSuffix?: string;
    maxWidth?: string | null;
    nowrap?: boolean;
    emptyText?: string;
}

const TextTruncateColumn = ({
    result,
    columnName,
    path,
    stripTags = true,
    stripLength = 50,
    stripSuffix = "...",
    maxWidth = null,
    nowrap = false,
    emptyText,
}: TextTruncateColumnProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("TextTruncateColumn component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("TextTruncateColumn component: Missing required result prop");
    }

    const [truncated, setTruncated] = React.useState(false);
    const { t } = useTranslation();

    const initialValue = getIn(result, path ? path : columnName);
    let shortValue = initialValue;

    if (typeof initialValue !== "undefined" && isString(initialValue)) {
        shortValue = shortValue.toString();

        if (shortValue && stripTags) {
            shortValue = shortValue.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ");
        }

        if (shortValue && stripLength && shortValue.length - stripSuffix.length > stripLength) {
            shortValue = shortValue.substr(0, stripLength - stripSuffix.length) + stripSuffix;
        }
    }

    const needTruncate = initialValue !== shortValue;
    const sx: SxProps = { wordBreak: "break-all" };

    if (maxWidth) {
        sx.maxWidth = maxWidth;
    }

    if (nowrap) {
        sx.whiteSpace = "nowrap";
    }

    const text = truncated ? <Box {...{ sx }}>{initialValue}</Box> : shortValue;

    if (needTruncate) {
        return (
            <Box
                {...{
                    onClick: () => setTruncated(!truncated),
                    sx: { cursor: "pointer" },
                }}
            >
                {text}
            </Box>
        );
    }

    if (text) {
        return <>{text}</>;
    }

    if (emptyText) {
        return <>{t(emptyText)}</>;
    }

    return null;
};

export default TextTruncateColumn;
export { TextTruncateColumnProps };
