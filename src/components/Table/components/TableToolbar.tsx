import React from "react";
import { Box } from "@mui/material";
import { useTable } from "../../../components/Table/contexts/Table";

const TableToolbar = () => {
    const { toolbar } = useTable();

    if (typeof toolbar === "undefined") {
        return null;
    }

    return (
        <Box mb={2} sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {toolbar}
        </Box>
    );
};

export default TableToolbar;
