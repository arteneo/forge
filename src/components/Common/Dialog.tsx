import React from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogProps as MuiDialogProps,
    DialogTitle,
} from "@mui/material";
import Button, { ButtonProps } from "../../components/Common/Button";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import Optional from "../../definitions/Optional";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    buttonBackProps?: ButtonProps;
    title?: string;
    titleVariables?: TranslateVariablesInterface;
    children: React.ReactNode;
    dialogProps?: Optional<MuiDialogProps, "open">;
}

const Dialog = ({
    open,
    onClose,
    buttonBackProps = {
        label: "action.back",
        variant: "outlined",
    },
    title = "dialog.title",
    titleVariables,
    children,
    dialogProps = {
        fullWidth: true,
        maxWidth: "sm",
    },
}: DialogProps) => {
    const { t } = useTranslation();

    return (
        <MuiDialog
            {...{
                open,
                onClose,
                ...dialogProps,
            }}
        >
            <DialogTitle>{t(title, titleVariables)}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                    <Button onClick={() => onClose()} {...buttonBackProps} />
                </Box>
            </DialogActions>
        </MuiDialog>
    );
};

export default Dialog;
export { DialogProps };
