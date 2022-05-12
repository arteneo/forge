import React from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
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
        label: "action.close",
        variant: "outlined",
        color: "warning",
        startIcon: <Close />,
    },
    buttonConfirmProps = {
        label: "action.save",
        variant: "contained",
        color: "primary",
        endIcon: <Check />,
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
            <DialogActions {...{ sx: { justifyContent: "space-between" } }}>
                <Button onClick={() => onClose()} {...buttonBackProps} />
                <Button type="submit" {...{ disabled: isSubmitting, ...buttonConfirmProps }} />
            </DialogActions>
        </>
    );
};

export default DialogFormView;
export { DialogFormViewProps };
