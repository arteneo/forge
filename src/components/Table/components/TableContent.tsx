import React from "react";
import { Paper } from "@mui/material";
import TableFilters from "../../../components/Table/components/TableFilters";
import TableResults from "../../../components/Table/components/TableResults";

const TableContent = () => {
    return (
        <>
            <TableFilters />

            <Paper sx={{ px: { xs: 2, md: 3 }, py: { xs: 1, md: 2 } }}>
                <TableResults />
            </Paper>
        </>
    );
};

export default TableContent;
