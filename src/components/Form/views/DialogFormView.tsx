import React from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { Box, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button, { ButtonProps } from "../../../components/Common/Button";
import TranslateVariablesInterface from "../../../definitions/TranslateVariablesInterface";

interface DialogFormViewProps {
    onClose: () => void;
    buttonBackProps?: ButtonProps;
    buttonConfirmProps?: ButtonProps;
    title?: string;
    titleVariables?: TranslateVariablesInterface;
    children: React.ReactNode;
}

const DialogFormView = ({
    onClose,
    buttonBackProps = {
        label: "action.back",
        variant: "outlined",
    },
    buttonConfirmProps = {
        label: "action.confirm",
        variant: "contained",
        color: "primary",
    },
    title = "dialog.form.title",
    titleVariables,
    children,
}: DialogFormViewProps) => {
    const { t } = useTranslation();
    const { isSubmitting } = useFormikContext();

    return (
        <>
            <DialogTitle>{t(title, titleVariables)}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                    <Button onClick={() => onClose()} {...buttonBackProps} />
                    <Button type="submit" {...{ disabled: isSubmitting, ...buttonConfirmProps }} />
                </Box>
            </DialogActions>
        </>
    );
};

export default DialogFormView;
export { DialogFormViewProps };
