import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle } from "@mui/material";
import Button, { ButtonProps } from "../../components/Common/Button";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import { Optional } from "../../utilities/TypescriptOperators";
import Form, { FormProps } from "../../components/Form/components/Form";

interface DialogFormProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    buttonBackProps?: ButtonProps;
    buttonConfirmProps?: ButtonProps;
    title?: string;
    titleVariables?: TranslateVariablesInterface;
    children?: React.ReactNode;
    label?: string;
    labelVariables?: TranslateVariablesInterface;
    dialogProps?: Optional<DialogProps, "open">;
}

const DialogForm = ({
    open,
    onClose,
    onConfirm,
    buttonBackProps = {
        label: "action.back",
        variant: "outlined",
    },
    buttonConfirmProps = {
        label: "action.confirm",
        variant: "contained",
        color: "primary",
    },
    title = "dialog.confirm.title",
    titleVariables,
    children,
    label,
    labelVariables,
    dialogProps = {
        fullWidth: true,
        maxWidth: "sm",
    },
}: DialogFormProps) => {
    const { t } = useTranslation();

    // Using DialogFormProps typing definition that allows only label OR only children to be defined
    // gives missleading error when using none of them or both of them
    // Decided to go with Error throwing to make it easier for developers
    if (children === undefined && label === undefined) {
        throw new Error("DialogForm component: Missing children or label prop");
    }

    if (children !== undefined && label !== undefined) {
        throw new Error("DialogForm component: It is not possible to use children and label prop at the same time");
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
            <Form
                {...{
                    fields,
                    endpoint,
                }}
            >
                <DialogTitle>{t(title, titleVariables)}</DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                        <Button onClick={() => onClose()} {...buttonBackProps} />
                        <Button onClick={() => onConfirm()} {...buttonConfirmProps} />
                    </Box>
                </DialogActions>
            </Form>
        </Dialog>
    );
};

export default DialogForm;
export { DialogFormProps };
