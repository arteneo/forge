import React from "react";
import { useTranslation } from "react-i18next";
import {
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogProps as MuiDialogProps,
    DialogTitle,
} from "@mui/material";
import { Close } from "@mui/icons-material";
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
        label: "action.close",
        variant: "outlined",
        color: "warning",
        startIcon: <Close />,
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
            <DialogActions {...{ sx: { justifyContent: "flex-start" } }}>
                <Button onClick={() => onClose()} {...buttonBackProps} />
            </DialogActions>
        </MuiDialog>
    );
};

export default Dialog;
export { DialogProps };
