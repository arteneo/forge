import React from "react";
import { TableFooter, TableRow, TablePagination as MuiTablePagination } from "@mui/material";
import { useTable } from "../../../components/Table/contexts/Table";
import TablePaginationActions from "../../../components/Table/components/TablePaginationActions";
import { useTranslation } from "react-i18next";

// TODO Remove component
const TablePagination = () => {
    const { t } = useTranslation();
    const { page, rowCount, rowsPerPage, rowsPerPageOptions, onChangePage, onChangeRowsPerPage } = useTable();

    return (
        <TableFooter>
            <TableRow>
                <MuiTablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    count={rowCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onChangePage}
                    onRowsPerPageChange={onChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) =>
                        t("crud.displayedRows", {
                            from: from,
                            to: to === -1 ? count : to,
                            count: count,
                        })
                    }
                    labelRowsPerPage={t("crud.rowsPerPage")}
                    ActionsComponent={TablePaginationActions}
                />
            </TableRow>
        </TableFooter>
    );
};

export default TablePagination;
