import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FirstPage, LastPage, KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { useTable } from "../../../components/Table/contexts/Table";

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
        onChangePage(event, Math.max(1, Math.ceil(rowCount / rowsPerPage)));
    };

    return (
        <Box {...{ display: "flex", ml: 4 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 1}
                aria-label={t("table.pagination.firstPage") ?? ""}
            >
                {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 1}
                aria-label={t("table.pagination.previousPage") ?? ""}
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(rowCount / rowsPerPage)}
                aria-label={t("table.pagination.nextPage") ?? ""}
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(rowCount / rowsPerPage)}
                aria-label={t("table.pagination.lastPage") ?? ""}
            >
                {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
            </IconButton>
        </Box>
    );
};

export default TableResultsPaginationActions;
