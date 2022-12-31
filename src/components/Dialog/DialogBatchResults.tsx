import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, Error, FastForward } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import { BatchResultInterface, useDialogBatch } from "../../contexts/DialogBatch";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";

const DialogBatchResults = () => {
    const { t } = useTranslation();
    const { batchResults } = useDialogBatch();

    const getIcon = (batchResult: BatchResultInterface) => {
        let tooltipLabel = "dialogBatchResults.tooltip.";
        const tooltipLabelVariables: TranslateVariablesInterface = {};
        let icon: React.ReactElement;

        switch (batchResult.status) {
            case "success":
                tooltipLabel += "success";
                icon = <CheckCircle {...{ color: "success" }} />;
                break;
            case "skipped":
                tooltipLabel += "skipped";
                icon = <FastForward {...{ color: "warning" }} />;
                break;
            case "error":
                if (batchResult.message) {
                    tooltipLabel += "errorMessage";
                    tooltipLabelVariables["message"] = t(batchResult.message, batchResult.messageVariables);
                } else {
                    tooltipLabel += "error";
                }

                icon = <Error {...{ color: "error" }} />;
                break;
        }

        return <Tooltip {...{ title: t(tooltipLabel, tooltipLabelVariables) }}>{icon}</Tooltip>;
    };

    if (batchResults.length === 0) {
        return null;
    }

    return (
        <Box {...{ sx: { display: "flex", gap: 0.5, mt: 2, flexDirection: "column" } }}>
            {batchResults.map((batchResult) => (
                <Box key={batchResult.id} {...{ sx: { display: "flex", gap: 1 } }}>
                    <Box {...{ sx: { display: "flex", flexGrow: 1 } }}>{batchResult.representation}</Box>
                    {getIcon(batchResult)}
                </Box>
            ))}
        </Box>
    );
};

export default DialogBatchResults;
