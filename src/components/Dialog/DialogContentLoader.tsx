import { Box, CircularProgress } from "@mui/material";
import React from "react";

const DialogContentLoader = () => {
    return (
        <Box
            {...{
                sx: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 100,
                    width: "100%",
                },
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default DialogContentLoader;
