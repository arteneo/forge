import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import Button, { ButtonProps } from "@arteneo/forge/components/Common/Button";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useSnackbar } from "@arteneo/forge/contexts/Snackbar";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import { resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { Alert } from "@material-ui/lab";
import ResultInterface from "@arteneo/forge/components/Table/definitions/ResultInterface";

interface BatchProps extends ButtonProps {
    confirmationLabel: string;
    snackbarLabel: string;
    endpoint: string;
    resultRepresentation?: (result: ResultInterface) => React.ReactNode;
}

const Batch = ({
    label,
    confirmationLabel,
    snackbarLabel,
    endpoint,
    resultRepresentation = (result: ResultInterface) => result.representation,
    ...props
}: BatchProps) => {
    const { t } = useTranslation();
    const { results, selected, reload, batchQuery } = useTable();
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader } = useLoader();
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const batchAction = (): void => {
        showLoader();

        axios
            .post(endpoint, batchQuery)
            .then(() => {
                showSuccess(snackbarLabel);

                setShowConfirmation(false);

                reload();
            })
            .catch((error) => handleCatch(error));
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
                <DialogContent>
                    <Alert severity="error">{t(confirmationLabel)}</Alert>
                    <ul>
                        {results
                            .filter((result) => selected.includes(result.id))
                            .map((result, key) => (
                                <li key={key}>{resultRepresentation(result)}</li>
                            ))}
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                        <Button onClick={() => setShowConfirmation(false)} variant="contained">
                            {t("action.cancel")}
                        </Button>
                        <Button
                            {...{
                                onClick: () => batchAction(),
                                label: resolvedLabel,
                                labelVariables: {
                                    count: selected.length,
                                },
                                color: "primary",
                                variant: "contained",
                                ...props,
                            }}
                        />
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Batch;
export { BatchProps };
