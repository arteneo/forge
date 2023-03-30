import React from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Alert,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogProps as MuiDialogProps,
    DialogTitle,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Button, { ButtonProps } from "../../components/Common/Button";
import Optional from "../../definitions/Optional";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import { ErrorInterface, useError } from "../../contexts/Error";

interface RequestExecutionErrorDialogProps {
    onClose?: () => void;
    buttonBackProps?: ButtonProps;
    title?: (errors: ErrorInterface[], message?: string) => string;
    titleVariables?: (errors: ErrorInterface[], message?: string) => TranslateVariablesInterface;
    disableTranslateTitle?: boolean;
    renderContent?: (errors: ErrorInterface[], message?: string) => React.ReactNode;
    dialogProps?: Optional<MuiDialogProps, "open">;
}

const RequestExecutionErrorDialog = ({
    onClose,
    buttonBackProps = {
        label: "action.close",
        variant: "outlined",
        color: "error",
        startIcon: <Close />,
    },
    title = () => "error.requestExecutionFailed",
    titleVariables = () => ({}),
    disableTranslateTitle = false,
    renderContent,
    dialogProps = {
        fullWidth: true,
        maxWidth: "sm",
    },
}: RequestExecutionErrorDialogProps) => {
    const { t } = useTranslation();
    const { error, message, errors, clearErrors } = useError();
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => processError(), [error]);

    const processError = () => {
        if (error === 409) {
            setOpen(error === 409);
        }
    };

    const resolvedOnClose = () => {
        clearErrors();
        setOpen(false);

        if (onClose) {
            onClose();
        }
    };

    const defaultRenderContent = () => (
        <Box {...{ sx: { gap: 2, display: "flex", flexDirection: "column" } }}>
            {errors.map((error, errorKey) => (
                <Alert key={errorKey} severity={error.severity}>
                    {t(error.message, error.parameters)}
                </Alert>
            ))}
        </Box>
    );

    // I do not know why i need to add this to avoid dialog with empty errors for a split second before closing
    if (!open) {
        return null;
    }

    return (
        <MuiDialog
            {...{
                open,
                ...dialogProps,
            }}
        >
            <DialogTitle>
                {disableTranslateTitle
                    ? title(errors, message)
                    : t(title(errors, message), titleVariables(errors, message))}
            </DialogTitle>
            <DialogContent>{renderContent ? renderContent(errors, message) : defaultRenderContent()}</DialogContent>
            <DialogActions {...{ sx: { justifyContent: "flex-start" } }}>
                <Button onClick={() => resolvedOnClose()} {...buttonBackProps} />
            </DialogActions>
        </MuiDialog>
    );
};

export default RequestExecutionErrorDialog;
export { RequestExecutionErrorDialogProps };
