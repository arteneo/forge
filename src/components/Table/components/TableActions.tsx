import React from "react";
import { Box } from "@mui/material";
import { useTable } from "../../../components/Table/contexts/Table";

const TableActions = () => {
    const { actions } = useTable();

    if (typeof actions === "undefined") {
        return null;
    }

    return (
        <Box mb={2} sx={{ display: "flex", gap: 2 }}>
            {actions}
        </Box>
    );
};

export default TableActions;
