import { Alert, AlertProps, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DialogBatchFormMulti, type DialogBatchFormMultiProps } from "../../components/Dialog/DialogBatchFormMulti";
import { useDialog } from "../../contexts/Dialog";
import { ResolveDialogPayloadType } from "../../definitions/ResolveDialogPayloadType";
import { TranslateVariablesInterface } from "../../definitions/TranslateVariablesInterface";
import { renderField } from "../../utilities/common";
import { resolveDialogPayload } from "../../utilities/resolve";

interface DialogBatchFormMultiAlertFieldsetProps extends Omit<DialogBatchFormMultiProps, "children"> {
    label: ResolveDialogPayloadType<string>;
    labelVariables?: ResolveDialogPayloadType<TranslateVariablesInterface>;
    alertProps?: AlertProps;
}

const DialogBatchFormMultiAlertFieldset = ({
    formProps,
    label,
    labelVariables = {},
    alertProps,
    ...props
}: DialogBatchFormMultiAlertFieldsetProps) => {
    const { payload, initialized } = useDialog();
    const { t } = useTranslation();

    const fields = formProps.fields;
    const render = renderField(fields);

    const resolvedLabel = resolveDialogPayload<string>(label, payload, initialized);
    const resolvedLabelVariables = resolveDialogPayload<TranslateVariablesInterface>(
        labelVariables,
        payload,
        initialized,
    );

    return (
        <DialogBatchFormMulti
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

export { DialogBatchFormMultiAlertFieldset, type DialogBatchFormMultiAlertFieldsetProps };
