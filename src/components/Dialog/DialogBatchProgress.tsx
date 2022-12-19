import React from "react";
import { LinearProgress } from "@mui/material";
import { useDialogBatch } from "../..//contexts/DialogBatch";

const DialogBatchProgress = () => {
    const { results, processing, batchResults } = useDialogBatch();

    if (!processing) {
        return null;
    }

    const progress = Math.round((batchResults.length * 100) / results.length);

    return <LinearProgress {...{ variant: "determinate", value: progress, sx: { mt: 2 } }} />;
};

export default DialogBatchProgress;
