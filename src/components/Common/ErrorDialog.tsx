import React from "react";
import { useTranslation } from "react-i18next";
import {
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
import { DetailedErrorInterface, useError } from "../../contexts/Error";
import { Box } from "@mui/system";

interface ErrorDialogProps {
    onClose?: () => void;
    buttonBackProps?: ButtonProps;
    renderContent?: (message?: string, detailedErrors?: DetailedErrorInterface[]) => React.ReactNode;
    renderTitle?: (message?: string, detailedErrors?: DetailedErrorInterface[]) => React.ReactNode | string;
    dialogProps?: Optional<MuiDialogProps, "open">;
}

const ErrorDialog = ({
    onClose,
    buttonBackProps = {
        label: "action.close",
        variant: "outlined",
        color: "error",
        startIcon: <Close />,
    },
    renderTitle,
    renderContent,
    dialogProps = {
        fullWidth: true,
        maxWidth: "sm",
    },
}: ErrorDialogProps) => {
    const { t } = useTranslation();
    const { error, message, detailedErrors, clearDetailedErrors } = useError();
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => openErrorDialog(), [error]);

    const openErrorDialog = () => {
        console.log(error);
        if (error == 409) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const resolvedOnClose = () => {
        setOpen(false);
        clearDetailedErrors();
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
                {renderTitle ? renderTitle(message, detailedErrors) : t(message ? message : "title.error")}
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

export default ErrorDialog;
export { ErrorDialogProps };
