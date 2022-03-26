import React from "react";
import TableColumnPathType from "../../../components/Table/definitions/TableColumnPathType";
import { getIn, isString } from "formik";
import { useTranslation } from "react-i18next";

interface TextTruncateColumnProps extends TableColumnPathType {
    defaultExpandInternal?: boolean;
    stripTags?: boolean;
    stripLength?: number;
    stripSuffix?: string;
    maxWidth?: string | null;
    nowrap?: boolean;
    emptyText?: string;
}

const TextTruncateColumn = ({
    result,
    field,
    path,
    defaultExpandInternal = false,
    stripTags = true,
    stripLength = 50,
    stripSuffix = "...",
    maxWidth = null,
    nowrap = false,
    emptyText = "label.emptyField",
}: TextTruncateColumnProps) => {
    if (typeof field === "undefined") {
        throw new Error("TextTruncateColumn component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("TextTruncateColumn component: Missing required result prop");
    }

    const [showFull, setShowFull] = React.useState(false);
    const { t } = useTranslation();

    const initialValue = getIn(result, path ? path : field);
    let shortValue = initialValue;

    if (initialValue !== undefined && isString(initialValue)) {
        shortValue = shortValue.toString();

        if (shortValue && stripTags) {
            shortValue = shortValue.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ");
        }

        if (shortValue && stripLength && shortValue.length - stripSuffix.length > stripLength) {
            shortValue = shortValue.substr(0, stripLength - stripSuffix.length) + stripSuffix;
        }
    }

    const needShorten = initialValue !== shortValue;
    // eslint-disable-next-line
    const style: any = { wordBreak: "break-all" };

    if (maxWidth) {
        style.maxWidth = maxWidth;
    }

    if (nowrap) {
        style.whiteSpace = "nowrap";
    }

    const showedText = showFull ? <span style={style}>{initialValue}</span> : shortValue;

    return (
        <>
            {defaultExpandInternal && needShorten ? (
                <span
                    onClick={() => {
                        setShowFull(!showFull);
                    }}
                    style={{ cursor: "pointer" }}
                >
                    {showedText}
                </span>
            ) : (
                <>{!showedText ? showedText : t(emptyText)}</>
            )}
        </>
    );
};

export default TextTruncateColumn;
export { TextTruncateColumnProps };
