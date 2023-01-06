import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, AlertProps, Box } from "@mui/material";
import { useDialog } from "../../contexts/Dialog";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import DialogBatchForm, { DialogBatchFormProps } from "../../components/Dialog/DialogBatchForm";
import { renderField } from "../../utilities/common";
import ResolveDialogPayloadType from "../../definitions/ResolveDialogPayloadType";
import { resolveDialogPayload } from "../../utilities/resolve";

interface DialogBatchFormAlertFieldsetProps extends Omit<DialogBatchFormProps, "children"> {
    label: ResolveDialogPayloadType<string>;
    labelVariables?: ResolveDialogPayloadType<TranslateVariablesInterface>;
    alertProps?: AlertProps;
}

const DialogBatchFormAlertFieldset = ({
    formProps,
    label,
    labelVariables = {},
    alertProps,
    ...props
}: DialogBatchFormAlertFieldsetProps) => {
    const { payload, initialized } = useDialog();
    const { t } = useTranslation();

    const fields = formProps.fields;
    const render = renderField(fields);

    const resolvedLabel = resolveDialogPayload<string>(label, payload, initialized);
    const resolvedLabelVariables = resolveDialogPayload<TranslateVariablesInterface>(
        labelVariables,
        payload,
        initialized
    );

    return (
        <DialogBatchForm
            {...{
                children: (
                    <>
                        <Alert {...{ severity: "info", ...alertProps, sx: { mb: 3, ...alertProps?.sx } }}>
                            {t(resolvedLabel, resolvedLabelVariables)}
                        </Alert>
                        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                            {Object.keys(fields).map((field) => render(field))}
                        </Box>
                    </>
                ),
                formProps,
                ...props,
            }}
        />
    );
};

export default DialogBatchFormAlertFieldset;
export { DialogBatchFormAlertFieldsetProps };
