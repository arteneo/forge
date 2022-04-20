import React from "react";
import { useTable } from "../../../components/Table/contexts/Table";
import { Box, IconButton, useTheme } from "@mui/material";
import { FirstPage, LastPage, KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const TableResultsPaginationActions = () => {
    const { t } = useTranslation();
    const { page, rowCount, rowsPerPage, onChangePage } = useTable();

    const theme = useTheme();

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onChangePage(event, 1);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
        onChangePage(event, Math.max(1, Math.ceil(rowCount / rowsPerPage) - 1));
    };

    return (
        <Box>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 1}
                aria-label={t("table.tablePagination.firstPage")}
            >
                {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 1}
                aria-label={t("table.tablePagination.previousPage")}
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(rowCount / rowsPerPage) - 1}
                aria-label={t("table.tablePagination.nextPage")}
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(rowCount / rowsPerPage) - 1}
                aria-label={t("table.tablePagination.lastPage")}
            >
                {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
            </IconButton>
        </Box>
    );
};

export default TableResultsPaginationActions;
