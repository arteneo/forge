import React from "react";
import { Chip, makeStyles } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getIn } from "formik";
import TableColumnPathType from "@arteneo/forge/components/Table/definitions/TableColumnPathType";
import ChipFieldInterface from "@arteneo/forge/components/Table/definitions/ChipFieldInterface";

type BooleanColumnProps = TableColumnPathType & ChipFieldInterface;

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

const BooleanColumn = ({ result, field, path, chipProps }: BooleanColumnProps) => {
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
                <Chip label={t("label.yes")} className={classes.yes} {...chipProps} />
            ) : (
                <Chip label={t("label.no")} className={classes.no} {...chipProps} />
            )}
        </>
    );
};

export default BooleanColumn;
export { BooleanColumnProps };
