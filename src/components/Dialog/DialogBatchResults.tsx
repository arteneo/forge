import React from "react";
import { Box } from "@mui/material";
import { useDialogBatch } from "../../contexts/DialogBatch";

// TODO
const DialogBatchProgress = () => {
    const { processing, batchResults } = useDialogBatch();
    console.log("🚀 ~ file: DialogBatchProgress.tsx:7 ~ DialogBatchProgress ~ batchResults", batchResults);
    console.log("🚀 ~ file: DialogBatchProgress.tsx:7 ~ DialogBatchProgress ~ processing", processing);

    return (
        <Box
            {...{
                sx: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: 100, width: "100%" },
            }}
        >
            {batchResults.map((batchResult) => (
                <div key={batchResult.id}>{batchResult.representation}</div>
            ))}
        </Box>
    );
};

export default DialogBatchProgress;
