import { Paper } from "@mui/material";
import React from "react";

import TableFilters from "../../../components/Table/components/TableFilters";
import TableResults from "../../../components/Table/components/TableResults";
import TableToolbar from "../../../components/Table/components/TableToolbar";

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
