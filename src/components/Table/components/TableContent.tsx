import React from "react";
import { Paper } from "@mui/material";
import TableFilters from "../../../components/Table/components/TableFilters";
import TableToolbar from "../../../components/Table/components/TableToolbar";
import TableResults from "../../../components/Table/components/TableResults";

const TableContent = () => {
    return (
        <>
            <TableFilters />
            <Paper sx={{ px: { xs: 2, md: 3 }, pt: 3, pb: 3 }}>
                <TableToolbar />
                <TableResults />
            </Paper>
        </>
    );
};

export default TableContent;
