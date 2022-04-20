import React from "react";
import { TableFooter, TableRow, TablePagination } from "@mui/material";
import { useTable } from "../../../components/Table/contexts/Table";
import TableResultsPaginationActions from "../../../components/Table/components/TableResultsPaginationActions";
import { useTranslation } from "react-i18next";

const TableResultsPagination = () => {
    const { t } = useTranslation();
    const { page, rowCount, rowsPerPage, rowsPerPageOptions, onChangePage, onChangeRowsPerPage } = useTable();

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    {...{
                        // Page in MUI is starting from 0
                        page: page - 1,
                        rowsPerPageOptions,
                        rowsPerPage,
                        count: rowCount,
                        onPageChange: onChangePage,
                        onRowsPerPageChange: onChangeRowsPerPage,
                        labelDisplayedRows: ({ from, to, count }) =>
                            t("table.pagination.displayedRows", {
                                from: from,
                                to: to === -1 ? count : to,
                                count: count,
                            }),
                        labelRowsPerPage: t("table.pagination.rowsPerPage"),
                        ActionsComponent: TableResultsPaginationActions,
                    }}
                />
            </TableRow>
        </TableFooter>
    );
};

export default TableResultsPagination;
