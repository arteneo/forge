import { Alert, AlertProps } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import DialogBatch, { DialogBatchProps } from "../../components/Dialog/DialogBatch";
import { useDialog } from "../../contexts/Dialog";
import Optional from "../../definitions/Optional";
import ResolveDialogPayloadType from "../../definitions/ResolveDialogPayloadType";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import { resolveDialogPayload } from "../../utilities/resolve";

interface DialogBatchAlertProps extends Optional<DialogBatchProps, "children"> {
    label: ResolveDialogPayloadType<string>;
    labelVariables?: ResolveDialogPayloadType<TranslateVariablesInterface>;
    alertProps?: AlertProps;
}

const DialogBatchAlert = ({ label, labelVariables = {}, alertProps, ...props }: DialogBatchAlertProps) => {
    const { payload, initialized } = useDialog();
    const { t } = useTranslation();

    const resolvedLabel = resolveDialogPayload<string>(label, payload, initialized);
    const resolvedLabelVariables = resolveDialogPayload<TranslateVariablesInterface>(
        labelVariables,
        payload,
        initialized,
    );

    return (
        <DialogBatch
            {...{
                children: (
                    <Alert {...{ severity: "info", ...alertProps }}>{t(resolvedLabel, resolvedLabelVariables)}</Alert>
                ),
                ...props,
            }}
        />
    );
};

export default DialogBatchAlert;
export { DialogBatchAlertProps };
