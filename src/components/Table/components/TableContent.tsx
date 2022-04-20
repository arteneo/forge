import React from "react";
import { Paper } from "@mui/material";
import TableResults from "../../../components/Table/components/TableResults";

const TableContent = () => {
    return (
        <Paper sx={{ p: { xs: 2, md: 4 } }}>
            <TableResults />
        </Paper>
    );
};

export default TableContent;
