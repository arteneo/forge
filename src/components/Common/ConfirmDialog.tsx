import React from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle } from "@mui/material";
import { useSnackbar } from "../../contexts/Snackbar";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import Button, { ButtonProps } from "../../components/Common/Button";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import { Optional } from "../../utils/TypescriptOperators";

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    buttonBackProps?: ButtonProps;
    buttonConfirmProps?: ButtonProps;
    title?: string;
    titleVariables?: TranslateVariablesInterface;
    confirmationContent?: React.ReactNode;
    confirmationLabel?: string;
    confirmationLabelVariables?: TranslateVariablesInterface;
    dialogProps?: Optional<DialogProps, "open">;
}

const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    buttonBackProps = {
        label: "action.back",
        variant: "contained",
    },
    buttonConfirmProps = {
        label: "action.confirm",
        variant: "contained",
        color: "primary",
    },
    title = "crud.confirmation.title",
    titleVariables = {},
    confirmationContent,
    confirmationLabel = "crud.confirmation.label",
    confirmationLabelVariables = {},
    dialogProps = {
        fullWidth: true,
        maxWidth: "sm",
    },
}: ConfirmDialogProps) => {
    const { t } = useTranslation();

    if (typeof confirmationContent === "undefined") {
        confirmationContent = <DialogContentText>{t(confirmationLabel, confirmationLabelVariables)}</DialogContentText>;
    }

    return (
        <Dialog
            {...{
                open,
                onClose,
                ...dialogProps,
            }}
        >
            <DialogTitle>{t(title, titleVariables)}</DialogTitle>
            <DialogContent>{confirmationContent}</DialogContent>
            <DialogActions>
                <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                    <Button onClick={() => onClose()} {...buttonBackProps} />
                    <Button onClick={() => onConfirm()} {...buttonConfirmProps} />
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
export { ConfirmDialogProps };

// InformationDialog
// ConfirmationDialog
// FormDialog
