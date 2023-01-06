import React from "react";
import { LinearProgress, LinearProgressProps } from "@mui/material";
import { useDialogBatch } from "../..//contexts/DialogBatch";

const DialogBatchProgress = (props: LinearProgressProps) => {
    const { results, processing, batchResults } = useDialogBatch();

    if (!processing) {
        return null;
    }

    const progress = Math.round((batchResults.length * 100) / results.length);

    return <LinearProgress {...{ variant: "determinate", value: progress, ...props, sx: { mt: 2, ...props?.sx } }} />;
};

export default DialogBatchProgress;
export { LinearProgressProps as DialogBatchProgressProps };
