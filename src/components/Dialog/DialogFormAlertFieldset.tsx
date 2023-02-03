import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, AlertProps, Box } from "@mui/material";
import { useDialog } from "../../contexts/Dialog";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import DialogForm, { DialogFormProps } from "../../components/Dialog/DialogForm";
import { renderField } from "../../utilities/common";
import ResolveDialogPayloadType from "../../definitions/ResolveDialogPayloadType";
import { resolveDialogPayload } from "../../utilities/resolve";

interface DialogFormAlertFieldsetProps extends Omit<DialogFormProps, "children"> {
    label: ResolveDialogPayloadType<string>;
    labelVariables?: ResolveDialogPayloadType<TranslateVariablesInterface>;
    alertProps?: AlertProps;
}

const DialogFormAlertFieldset = ({
    formProps,
    label,
    labelVariables = {},
    alertProps,
    ...props
}: DialogFormAlertFieldsetProps) => {
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
        <DialogForm
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

export default DialogFormAlertFieldset;
export { DialogFormAlertFieldsetProps };
