import React from "react";
import { useTranslation } from "react-i18next";
import {
    DoneOutlineOutlined,
    ErrorOutlineOutlined,
    FastForwardOutlined,
    WarningAmberOutlined,
} from "@mui/icons-material";
import { Box, Divider, List, ListItem, Tooltip } from "@mui/material";
import { BatchResultInterface, BatchResultMessageInterface, useDialogBatch } from "../../contexts/DialogBatch";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";

const DialogBatchResults = () => {
    const { t } = useTranslation();
    const { batchResults } = useDialogBatch();

    const getFirstMessage = (batchResult: BatchResultInterface): undefined | BatchResultMessageInterface => {
        return batchResult.messages?.[0];
    };

    const getIcon = (batchResult: BatchResultInterface) => {
        const firstMessage = getFirstMessage(batchResult);

        let tooltipLabel = "dialogBatchResults.tooltip.";
        const tooltipLabelVariables: TranslateVariablesInterface = {};
        let icon: React.ReactElement;

        switch (batchResult.status) {
            case "success":
                tooltipLabel += "success";
                icon = <DoneOutlineOutlined {...{ color: "success" }} />;
                break;
            case "warning":
                tooltipLabel += "warning";
                icon = <WarningAmberOutlined {...{ color: "warning" }} />;
                break;
            case "skipped":
                tooltipLabel += "skipped";
                icon = <FastForwardOutlined {...{ color: "warning" }} />;
                break;
            case "error":
                tooltipLabel += "error";
                icon = <ErrorOutlineOutlined {...{ color: "error" }} />;
                break;
        }

        if (!showMessages(batchResult) && firstMessage) {
            tooltipLabel += "Message";
            tooltipLabelVariables["message"] = t(firstMessage.message, firstMessage.parameters);
        }

        return <Tooltip {...{ title: t(tooltipLabel, tooltipLabelVariables) }}>{icon}</Tooltip>;
    };

    const getMessageIcon = (message: BatchResultMessageInterface) => {
        let icon: React.ReactElement;

        switch (message.severity) {
            case "warning":
                icon = <WarningAmberOutlined {...{ color: "warning" }} />;
                break;
            case "error":
                icon = <WarningAmberOutlined {...{ color: "error" }} />;
                break;
        }

        return <Tooltip {...{ title: t(message.message, message.parameters) }}>{icon}</Tooltip>;
    };

    const showMessages = (batchResult: BatchResultInterface): boolean => {
        if (typeof batchResult.messages === "undefined") {
            return false;
        }

        // First message is mapped on the main icon
        return batchResult.messages.length > 1;
    };

    if (batchResults.length === 0) {
        return null;
    }

    return (
        <List
            {...{
                dense: true,
                sx: {
                    display: "flex",
                    gap: 0.5,
                    mt: 2,
                    flexDirection: "column",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "grey.300",
                    borderRadius: 1,
                },
            }}
        >
            {batchResults.map((batchResult, key) => (
                <React.Fragment key={batchResult.id}>
                    <ListItem {...{ sx: { display: "flex", gap: 1 } }}>
                        <Box {...{ sx: { display: "flex", flexGrow: 1 } }}>{batchResult.representation}</Box>
                        {showMessages(batchResult) && (
                            <Box {...{ sx: { display: "flex", gap: 1 } }}>
                                <Divider orientation="vertical" flexItem />
                                {batchResult.messages?.map((message, key) => (
                                    <React.Fragment key={key}>{getMessageIcon(message)}</React.Fragment>
                                ))}
                            </Box>
                        )}
                        <Divider orientation="vertical" flexItem />
                        {getIcon(batchResult)}
                    </ListItem>
                    {key + 1 < batchResults.length && <Divider />}
                </React.Fragment>
            ))}
        </List>
    );
};

export default DialogBatchResults;
