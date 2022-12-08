import React from "react";
import { Box, CircularProgress } from "@mui/material";

const DialogContentLoader = () => {
    return (
        <Box
            {...{
                sx: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: 100, width: "100%" },
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default DialogContentLoader;
