import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import { useLoader } from "@arteneo/forge/contexts/Loader";

const useStyles = makeStyles((theme) => ({
    buttons: {
        marginTop: theme.spacing(4),
        display: "flex",
        justifyContent: "space-between",
    },
}));

const TableFiltersButtons = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isSubmitting, setFieldValue } = useFormikContext();
    const { clearFilters } = useTable();
    const { visibleLoader } = useLoader();

    return (
        <div className={classes.buttons}>
            <Button type="submit" disabled={isSubmitting || visibleLoader} variant="contained" color="primary">
                {t("action.filtersApply")}
            </Button>

            <Button onClick={() => clearFilters(setFieldValue)} variant="contained">
                {t("action.filtersClear")}
            </Button>
        </div>
    );
};

export default TableFiltersButtons;
