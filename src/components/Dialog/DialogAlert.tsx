import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, AlertProps } from "@mui/material";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import Optional from "../../definitions/Optional";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";
import { useDialog } from "../../contexts/Dialog";
import ResolveDialogPayloadType from "../../definitions/ResolveDialogPayloadType";
import { resolveDialogPayload } from "../../utilities/resolve";

interface DialogAlertProps extends Optional<DialogProps, "children"> {
    label: ResolveDialogPayloadType<string>;
    labelVariables?: ResolveDialogPayloadType<TranslateVariablesInterface>;
    alertProps?: AlertProps;
}

const DialogAlert = ({ label, labelVariables = {}, alertProps, ...props }: DialogAlertProps) => {
    const { payload, initialized } = useDialog();
    const { t } = useTranslation();

    const resolvedLabel = resolveDialogPayload<string>(label, payload, initialized);
    const resolvedLabelVariables = resolveDialogPayload<TranslateVariablesInterface>(
        labelVariables,
        payload,
        initialized
    );

    return (
        <Dialog
            {...{
                children: (
                    <Alert {...{ severity: "info", ...alertProps }}>{t(resolvedLabel, resolvedLabelVariables)}</Alert>
                ),
                ...props,
            }}
        />
    );
};

export default DialogAlert;
export { DialogAlertProps };
