import { Alert, AlertProps } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Dialog, type DialogProps } from "../../components/Dialog/Dialog";
import { useDialog } from "../../contexts/Dialog";
import { Optional } from "../../definitions/Optional";
import { ResolveDialogPayloadType } from "../../definitions/ResolveDialogPayloadType";
import { TranslateVariablesInterface } from "../../definitions/TranslateVariablesInterface";
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
        initialized,
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

export { DialogAlert, type DialogAlertProps };
