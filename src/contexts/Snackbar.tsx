import React from "react";
import { useTranslation } from "react-i18next";
import { Close } from "@material-ui/icons";
import { Snackbar, SnackbarProps, SnackbarContent, SnackbarCloseReason, IconButton } from "@material-ui/core";
import TranslateVariablesInterface from "@arteneo/forge/definitions/TranslateVariablesInterface";

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

    // eslint-disable-next-line
    const onClose = (event: React.SyntheticEvent<any>, reason: SnackbarCloseReason) => {
        if (reason === "clickaway") {
            return;
        }

        close();
    };

    const close = () => {
        setSnackbarMessage(undefined);
    };

    const getVariantClassname = (variant: string): string => {
        return variant.charAt(0).toUpperCase() + variant.slice(1);
    };

    const internalSnackbarProps = {
        anchorOrigin: {
            vertical: "top",
            horizontal: "center",
        },
    };

    const mergedFieldProps = Object.assign(internalSnackbarProps, snackbarProps);

    return (
        <>
            <SnackbarContext.Provider
                value={{
                    autoHideDuration: autoHideDuration,
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
            {typeof snackbarMessage !== "undefined" && (
                <Snackbar
                    {...{
                        className: "MuiSnackbar-variant" + getVariantClassname(snackbarMessage.variant),
                        autoHideDuration: snackbarMessage.autoHideDuration,
                        message: snackbarMessage.message,
                        open: true,
                        onClose,
                        ...mergedFieldProps,
                    }}
                >
                    <SnackbarContent
                        {...{
                            className: "MuiSnackbarContent-variant" + getVariantClassname(snackbarMessage.variant),
                            "aria-describedby": "client-snackbar",
                            message: <span id="client-snackbar">{snackbarMessage.message}</span>,
                            action: [
                                <IconButton
                                    key="close"
                                    {...{
                                        "aria-label": t("action.close"),
                                        size: "small",
                                        color: "inherit",
                                        onClick: () => close(),
                                    }}
                                >
                                    <Close />
                                </IconButton>,
                            ],
                        }}
                    />
                </Snackbar>
            )}
        </>
    );
};

const useSnackbar = (): SnackbarContextProps => React.useContext(SnackbarContext);

export { SnackbarContext, SnackbarContextProps, SnackbarProvider, SnackbarProviderProps, useSnackbar, SnackbarVariant };
