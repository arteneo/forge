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
import { DetailedErrorInterface, useError } from "../../contexts/Error";

interface RequestExecutionErrorDialogProps {
    onClose?: () => void;
    buttonBackProps?: ButtonProps;
    title?: (message?: string, detailedErrors?: DetailedErrorInterface[]) => string;
    titleVariables?: (message?: string, detailedErrors?: DetailedErrorInterface[]) => TranslateVariablesInterface;
    disableTranslateTitle?: boolean;
    renderContent?: (message?: string, detailedErrors?: DetailedErrorInterface[]) => React.ReactNode;
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
    title = (message) => message ?? "error.requestExecutionFailed",
    titleVariables = () => ({}),
    disableTranslateTitle = false,
    renderContent,
    dialogProps = {
        fullWidth: true,
        maxWidth: "sm",
    },
}: RequestExecutionErrorDialogProps) => {
    const { t } = useTranslation();
    const { error, message, detailedErrors, clearErrors } = useError();
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => processError(), [error]);

    const processError = () => {
        setOpen(error === 409);
    };

    const resolvedOnClose = () => {
        setOpen(false);
        clearErrors();

        if (onClose) {
            onClose();
        }
    };

    const defaultRenderContent = () => (
        <Box {...{ sx: { gap: 2, display: "flex", flexDirection: "column" } }}>
            {detailedErrors ? (
                <>
                    {detailedErrors?.map((detailedError, detailedErrorKey) => (
                        <Alert key={detailedErrorKey} severity="error">
                            {t(detailedError.message, detailedError.parameters)}
                        </Alert>
                    ))}
                </>
            ) : null}
        </Box>
    );

    return (
        <MuiDialog
            {...{
                open,
                ...dialogProps,
            }}
        >
            <DialogTitle>
                {disableTranslateTitle
                    ? title(message, detailedErrors)
                    : t(title(message, detailedErrors), titleVariables(message, detailedErrors))}
            </DialogTitle>
            <DialogContent>
                {renderContent ? renderContent(message, detailedErrors) : defaultRenderContent()}
            </DialogContent>
            <DialogActions {...{ sx: { justifyContent: "flex-start" } }}>
                <Button onClick={() => resolvedOnClose()} {...buttonBackProps} />
            </DialogActions>
        </MuiDialog>
    );
};

export default RequestExecutionErrorDialog;
export { RequestExecutionErrorDialogProps };
