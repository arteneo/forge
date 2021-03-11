import React from "react";
import { Chip, ChipProps, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getIn } from "formik";
import TableColumnPathType from "@arteneo/forge/components/Table/definitions/TableColumnPathType";

const useStyles = makeStyles((theme) => ({
    yes: {
        borderColor: theme.palette.success.dark,
        color: theme.palette.success.dark,
    },
    no: {
        borderColor: theme.palette.error.dark,
        color: theme.palette.error.dark,
    },
}));

const BooleanColumn = ({
    result,
    field,
    path,
    variant = "outlined",
    size = "small",
    color = "default",
}: TableColumnPathType & ChipProps) => {
    if (typeof field === "undefined") {
        throw new Error("BooleanColumn component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("BooleanColumn component: Missing required result prop");
    }

    const { t } = useTranslation();
    const classes = useStyles();

    const value = getIn(result, path ? path : field);

    return (
        <>
            {value ? (
                <Chip variant={variant} size={size} label={t("label.yes")} className={classes.yes} color={color} />
            ) : (
                <Chip variant={variant} size={size} label={t("label.no")} className={classes.no} color={color} />
            )}
        </>
    );
};

export default BooleanColumn;
export { TableColumnPathType as BooleanColumnProps };
