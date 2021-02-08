import React from "react";
import { useTranslation } from "react-i18next";
import { Close } from "@material-ui/icons";
import { Snackbar, SnackbarContent, SnackbarCloseReason, IconButton, makeStyles } from "@material-ui/core";

interface ContextProps {
    show: (message: string, variant: "success" | "info" | "warning" | "error") => void;
    showSuccess: (message: string) => void;
    showInfo: (message: string) => void;
    showWarning: (message: string) => void;
    showError: (message: string) => void;
}

interface ProviderProps {
    children: React.ReactNode;
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
};

const SnackbarContext = React.createContext<ContextProps>(contextInitial);

const useStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: theme.palette.success.main,
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: theme.palette.warning.main,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
    snackbar: {
        left: 0,
        right: 0,
        top: "80px",
        transform: "none",
        [theme.breakpoints.up("md")]: {
            left: "240px",
            width: "calc(100% - 240px)",
        },
    },
}));

const SnackbarProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [variant, setVariant] = React.useState<"success" | "info" | "warning" | "error">("success");

    const show = (message: string, variant: "success" | "info" | "warning" | "error"): void => {
        setMessage(t(message));
        setVariant(variant);
        setOpen(true);
    };

    // eslint-disable-next-line
    const onClose = (event: React.SyntheticEvent<any>, reason: SnackbarCloseReason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const showSuccess = (message: string): void => {
        show(message, "success");
    };

    const showInfo = (message: string): void => {
        show(message, "info");
    };

    const showWarning = (message: string): void => {
        show(message, "warning");
    };

    const showError = (message: string): void => {
        show(message, "error");
    };

    return (
        <>
            <SnackbarContext.Provider
                value={{
                    show,
                    showSuccess,
                    showInfo,
                    showWarning,
                    showError,
                }}
            >
                {children}
            </SnackbarContext.Provider>
            <Snackbar
                className={classes.snackbar}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                open={open}
                autoHideDuration={4000}
                message={message}
                onClose={onClose}
            >
                <SnackbarContent
                    className={classes[variant]}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            {message}
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            size="small"
                            color="inherit"
                            onClick={() => setOpen(false)}
                        >
                            <Close className={classes.icon} />
                        </IconButton>,
                    ]}
                />
            </Snackbar>
        </>
    );
};

const useSnackbar = (): ContextProps => React.useContext(SnackbarContext);

export { SnackbarContext, SnackbarProvider, useSnackbar };
