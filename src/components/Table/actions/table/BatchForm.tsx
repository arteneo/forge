import React from "react";
import { useTranslation } from "react-i18next";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import Button, { ButtonProps } from "@arteneo/forge/components/Common/Button";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useSnackbar } from "@arteneo/forge/contexts/Snackbar";
import { resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { Alert } from "@material-ui/lab";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";
import Form from "@arteneo/forge/components/Form/components/Form";
import FormContentFields from "@arteneo/forge/components/Form/components/FormContentFields";
import { FormikContext, FormikHelpers, FormikValues } from "formik";

interface BatchFormProps extends ButtonProps {
    fields: FieldsInterface;
    confirmationLabel: string;
    snackbarLabel: string;
    endpoint: string;
}

const BatchForm = ({ fields, label, confirmationLabel, snackbarLabel, endpoint, ...props }: BatchFormProps) => {
    const { t } = useTranslation();
    const { results, selected, reload, batchQuery } = useTable();
    const { showSuccess } = useSnackbar();
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const onSubmitSuccess = (
        defaultOnSubmitSuccess: () => void,
        // eslint-disable-next-line
        submitAction: any,
        helpers: FormikHelpers<FormikValues>
    ) => {
        helpers.setSubmitting(false);

        showSuccess(snackbarLabel);

        setShowConfirmation(false);

        reload();
    };

    const resolvedLabel = label ? resolveStringOrFunction(label, selected.length) : undefined;

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowConfirmation(true),
                    label: resolvedLabel,
                    labelVariables: {
                        count: selected.length,
                    },
                    disabled: selected.length === 0,
                    color: "primary",
                    variant: "contained",
                    ...props,
                }}
            />

            <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)} fullWidth maxWidth="sm">
                <DialogTitle>{t("crud.confirmation.title")}</DialogTitle>
                <Form
                    {...{
                        endpoint: endpoint,
                        changeSubmitValues: (values: FormikValues) => {
                            return Object.assign({}, batchQuery, values);
                        },
                        onSubmitSuccess,
                        buttons: null,
                    }}
                >
                    <DialogContent>
                        <Alert severity="error">{t(confirmationLabel)}</Alert>
                        <ul>
                            {results
                                .filter((result) => selected.includes(result.id))
                                .map((result, key) => (
                                    <li key={key}>{result.representation}</li>
                                ))}
                        </ul>
                        <FormContentFields {...{ fields, validationSchema: {} }} />
                    </DialogContent>
                    <DialogActions>
                        <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                            <Button onClick={() => setShowConfirmation(false)} variant="contained">
                                {t("action.cancel")}
                            </Button>
                            <FormikContext.Consumer>
                                {({ isSubmitting }) => (
                                    <Button
                                        {...{
                                            label: resolvedLabel,
                                            labelVariables: {
                                                count: selected.length,
                                            },
                                            type: "submit",
                                            disabled: isSubmitting,
                                            color: "primary",
                                            variant: "contained",
                                            ...props,
                                        }}
                                    />
                                )}
                            </FormikContext.Consumer>
                        </Box>
                    </DialogActions>
                </Form>
            </Dialog>
        </>
    );
};

export default BatchForm;
export { BatchFormProps };
