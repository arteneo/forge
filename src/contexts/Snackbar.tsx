import React from "react";
import { useTranslation } from "react-i18next";
import { Close } from "@mui/icons-material";
import { Snackbar, SnackbarProps, IconButton, Alert } from "@mui/material";
import TranslateVariablesInterface from "../definitions/TranslateVariablesInterface";

type SnackbarVariant = "success" | "info" | "warning" | "error";

interface SnackbarMessage {
    variant: SnackbarVariant;
    message: string;
    autoHideDuration?: number;
}

interface SnackbarContextProps {
    show: (
        message: string,
        variant: SnackbarVariant,
        messageVariables?: TranslateVariablesInterface,
        autoHideDuration?: number
    ) => void;
    showSuccess: (message: string, messageVariables?: TranslateVariablesInterface, autoHideDuration?: number) => void;
    showInfo: (message: string, messageVariables?: TranslateVariablesInterface, autoHideDuration?: number) => void;
    showWarning: (message: string, messageVariables?: TranslateVariablesInterface, autoHideDuration?: number) => void;
    showError: (message: string, messageVariables?: TranslateVariablesInterface, autoHideDuration?: number) => void;
    close: () => void;
    snackbar: React.ReactNode;
    autoHideDuration: number;
}

interface SnackbarProviderProps {
    children: React.ReactNode;
    snackbarProps?: SnackbarProps;
    autoHideDuration?: number;
}

const contextInitial = {
    show: (): void => {
        return;
    },
    showSuccess: (): void => {
        return;
    },
    showInfo: (): void => {
        return;
    },
    showWarning: (): void => {
        return;
    },
    showError: (): void => {
        return;
    },
    close: (): void => {
        return;
    },
    snackbar: null,
    autoHideDuration: 4000,
};

const SnackbarContext = React.createContext<SnackbarContextProps>(contextInitial);

const SnackbarProvider = ({ children, snackbarProps, autoHideDuration = 4000 }: SnackbarProviderProps) => {
    const { t } = useTranslation();
    const [snackbarMessage, setSnackbarMessage] = React.useState<undefined | SnackbarMessage>(undefined);

    const show = (
        message: string,
        variant: SnackbarVariant,
        messageVariables: TranslateVariablesInterface = {},
        autoHideDuration?: number
    ): void => {
        setSnackbarMessage({
            message: t(message, messageVariables),
            variant,
            autoHideDuration,
        });
    };

    const showSuccess = (
        message: string,
        messageVariables: TranslateVariablesInterface = {},
        autoHideDuration?: number
    ): void => {
        show(message, "success", messageVariables, autoHideDuration);
    };

    const showInfo = (
        message: string,
        messageVariables: TranslateVariablesInterface = {},
        autoHideDuration?: number
    ): void => {
        show(message, "info", messageVariables, autoHideDuration);
    };

    const showWarning = (
        message: string,
        messageVariables: TranslateVariablesInterface = {},
        autoHideDuration?: number
    ): void => {
        show(message, "warning", messageVariables, autoHideDuration);
    };

    const showError = (
        message: string,
        messageVariables: TranslateVariablesInterface = {},
        autoHideDuration?: number
    ): void => {
        show(message, "error", messageVariables, autoHideDuration);
    };

    const onClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        close();
    };

    const close = () => {
        setSnackbarMessage(undefined);
    };

    const internalSnackbarProps = {
        anchorOrigin: {
            vertical: "top",
            horizontal: "center",
        },
    };

    const mergedFieldProps = Object.assign(internalSnackbarProps, snackbarProps);
    let snackbar: React.ReactNode = null;
    if (typeof snackbarMessage !== "undefined") {
        snackbar = (
            <Snackbar
                {...{
                    autoHideDuration: snackbarMessage.autoHideDuration || autoHideDuration,
                    message: snackbarMessage.message,
                    open: true,
                    onClose,
                    action: (
                        <IconButton
                            {...{
                                "aria-label": t("action.close"),
                                size: "small",
                                color: "inherit",
                                onClick: () => close(),
                            }}
                        >
                            <Close />
                        </IconButton>
                    ),
                    ...mergedFieldProps,
                }}
            >
                <Alert {...{ onClose, severity: snackbarMessage.variant, sx: { width: "100%" } }}>
                    {snackbarMessage.message}
                </Alert>
            </Snackbar>
        );
    }

    return (
        <>
            <SnackbarContext.Provider
                value={{
                    autoHideDuration,
                    snackbar,
                    show,
                    showSuccess,
                    showInfo,
                    showWarning,
                    showError,
                    close,
                }}
            >
                {children}
            </SnackbarContext.Provider>
        </>
    );
};

const useSnackbar = (): SnackbarContextProps => React.useContext(SnackbarContext);

export { SnackbarContext, SnackbarContextProps, SnackbarProvider, SnackbarProviderProps, useSnackbar, SnackbarVariant };
