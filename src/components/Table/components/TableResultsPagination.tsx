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
                        page,
                        rowsPerPageOptions,
                        rowsPerPage,
                        count: rowCount,
                        onPageChange: onChangePage,
                        onRowsPerPageChange: onChangeRowsPerPage,
                        labelDisplayedRows: ({ from, to, count }) =>
                            t("table.resultsPagination.displayedRows", {
                                from: from,
                                to: to === -1 ? count : to,
                                count: count,
                            }),
                        labelRowsPerPage: t("table.resultsPagination.rowsPerPage"),
                        ActionsComponent: TableResultsPaginationActions,
                    }}
                />
            </TableRow>
        </TableFooter>
    );
};

export default TableResultsPagination;
