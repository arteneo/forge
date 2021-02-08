import React from "react";
import { Chip, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

interface Props {
    // result is added to props by TableContent
    // eslint-disable-next-line
    result?: any;
    // field is added to props by TableContent
    field?: string;
    disableSorting?: boolean;
}

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

const Boolean: React.FC<Props> = ({ result, field }: Props) => {
    if (typeof field === "undefined") {
        return null;
    }

    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            {result[field] ? (
                <Chip variant="outlined" size="small" label={t("label.yes")} className={classes.yes} />
            ) : (
                <Chip variant="outlined" size="small" label={t("label.no")} className={classes.no} />
            )}
        </>
    );
};

export default Boolean;
