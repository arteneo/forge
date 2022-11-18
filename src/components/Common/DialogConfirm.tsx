import React from "react";
import { useTranslation } from "react-i18next";
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import Button, { ButtonProps } from "../../components/Common/Button";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import Optional from "../../definitions/Optional";
import { useLoader } from "../../contexts/Loader";
import { Box } from "@mui/system";

interface DialogConfirmProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    buttonBackProps?: ButtonProps;
    buttonConfirmProps?: ButtonProps;
    enableDialogLoader?: boolean;
    title: string;
    titleVariables?: TranslateVariablesInterface;
    children?: React.ReactNode;
    label?: string;
    labelVariables?: TranslateVariablesInterface;
    dialogProps?: Optional<DialogProps, "open">;
}

const DialogConfirm = ({
    open,
    onClose,
    onConfirm,
    buttonBackProps = {
        label: "action.close",
        variant: "outlined",
        color: "warning",
        startIcon: <Close />,
    },
    buttonConfirmProps = {
        label: "action.confirm",
        variant: "contained",
        color: "primary",
        endIcon: <Check />,
    },
    enableDialogLoader = false,
    title,
    titleVariables,
    children,
    label,
    labelVariables,
    dialogProps = {
        fullWidth: true,
        maxWidth: "sm",
    },
}: DialogConfirmProps) => {
    const { t } = useTranslation();
    const { visibleLoader } = useLoader();

    // Using DialogConfirmProps typing definition that allows only label OR only children to be defined
    // gives missleading error when using none of them or both of them
    // Decided to go with Error throwing to make it easier for developers
    if (children === undefined && label === undefined) {
        throw new Error("DialogConfirm component: Missing children or label prop");
    }

    if (children !== undefined && label !== undefined) {
        throw new Error("DialogConfirm component: It is not possible to use children and label prop at the same time");
    }

    if (children === undefined && label !== undefined) {
        children = <DialogContentText>{t(label, labelVariables)}</DialogContentText>;
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
            <DialogContent>
                {enableDialogLoader && visibleLoader && (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress {...{ sx: { display: "flex", m: 2 }, color: "inherit", size: 20 }} />
                    </Box>
                )}
                {children}
            </DialogContent>
            <DialogActions {...{ sx: { justifyContent: "space-between" } }}>
                <Button onClick={() => onClose()} {...buttonBackProps} />
                <Button onClick={() => onConfirm()} {...buttonConfirmProps} />
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirm;
export { DialogConfirmProps };
