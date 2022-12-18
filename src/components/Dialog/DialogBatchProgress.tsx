import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useDialogBatch } from "../..//contexts/DialogBatch";

// TODO
const DialogBatchProgress = () => {
    const { processing, batchResults } = useDialogBatch();
    console.log("🚀 ~ file: DialogBatchProgress.tsx:7 ~ DialogBatchProgress ~ batchResults", batchResults);
    console.log("🚀 ~ file: DialogBatchProgress.tsx:7 ~ DialogBatchProgress ~ processing", processing);

    if (!processing) {
        return null;
    }

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

export default DialogBatchProgress;
