import React from "react";
import { Chip, ChipProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getIn } from "formik";
import ColumnPathInterface from "../../../components/Table/definitions/ColumnPathInterface";

interface BooleanColumnProps extends ColumnPathInterface {
    chipProps?: ChipProps;
}

const BooleanColumn = ({ result, columnName, path, chipProps }: BooleanColumnProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("BooleanColumn component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("BooleanColumn component: Missing required result prop");
    }

    const { t } = useTranslation();

    const value = getIn(result, path ? path : columnName);
    if (value) {
        return (
            <Chip
                {...{
                    label: t("booleanColumn.yes"),
                    color: "success",
                    size: "small",
                    variant: "outlined",
                    ...chipProps,
                }}
            />
        );
    }

    return (
        <Chip {...{ label: t("booleanColumn.no"), color: "error", size: "small", variant: "outlined", ...chipProps }} />
    );
};

export default BooleanColumn;
export { BooleanColumnProps };
