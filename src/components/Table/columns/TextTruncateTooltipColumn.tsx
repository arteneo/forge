import React from "react";
import { getIn, isString } from "formik";
import { useTranslation } from "react-i18next";
import { Box, SxProps, Tooltip, TooltipProps } from "@mui/material";
import ColumnPathInterface from "../../../components/Table/definitions/ColumnPathInterface";

interface TextTruncateTooltipColumnProps extends ColumnPathInterface {
    stripTags?: boolean;
    stripLength?: number;
    stripSuffix?: string;
    maxWidth?: string | null;
    nowrap?: boolean;
    emptyText?: string;
    tooltipProps?: Partial<TooltipProps>;
}

const TextTruncateTooltipColumn = ({
    result,
    columnName,
    path,
    stripTags = true,
    stripLength = 50,
    stripSuffix = "...",
    maxWidth = null,
    nowrap = false,
    emptyText,
    tooltipProps,
}: TextTruncateTooltipColumnProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("TextTruncateTooltipColumn component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("TextTruncateTooltipColumn component: Missing required result prop");
    }

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

    if (needTruncate) {
        return (
            <Tooltip {...{ title: initialValue, ...tooltipProps }}>
                <Box
                    {...{
                        component: "span",
                        sx: { cursor: "help", display: "inline-flex" },
                    }}
                >
                    {shortValue}
                </Box>
            </Tooltip>
        );
    }

    if (initialValue) {
        return <>{initialValue}</>;
    }

    if (emptyText) {
        return <>{t(emptyText)}</>;
    }

    return null;
};

export default TextTruncateTooltipColumn;
export { TextTruncateTooltipColumnProps };
