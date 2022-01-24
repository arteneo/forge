import React from "react";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import { IconButton, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FirstPage, LastPage, KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const TablePaginationActions = () => {
    const { t } = useTranslation();
    const { page, rowCount, rowsPerPage, onChangePage } = useTable();

    const classes = useStyles();
    const theme = useTheme();

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onChangePage(event, Math.max(0, Math.ceil(rowCount / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label={t("crud.firstPage")}>
                {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label={t("crud.previousPage")}>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(rowCount / rowsPerPage) - 1}
                aria-label={t("crud.nextPage")}
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(rowCount / rowsPerPage) - 1}
                aria-label={t("crud.lastPage")}
            >
                {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
            </IconButton>
        </div>
    );
};

export default TablePaginationActions;
