import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import { useSnackbar } from "@arteneo/forge/contexts/Snackbar";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import Button, { ButtonProps } from "@arteneo/forge/components/Common/Button";
import ColumnInterface from "@arteneo/forge/components/Table/definitions/ColumnInterface";

interface DeleteInterface {
    // eslint-disable-next-line
    endpoint?: string | ((result: any) => string);
    confirmationLabel?: string;
}
type DeleteProps = DeleteInterface & ButtonProps & ColumnInterface;

const Delete = ({ endpoint, result, confirmationLabel = "crud.confirmation.delete", ...props }: DeleteProps) => {
    const { t } = useTranslation();
    const { reload, custom } = useTable();
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader } = useLoader();
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    if (typeof endpoint === "undefined" && typeof custom?.endpoints?.delete === "undefined") {
        throw new Error(
            "Delete component: Missing required to prop or endpoints.delete definition in custom variable used by Table context"
        );
    }

    const deleteResult = (): void => {
        showLoader();

        const resolvedEndpoint = endpoint ? resolveStringOrFunction(endpoint, result) : custom.endpoints.delete(result);

        axios
            .delete(resolvedEndpoint)
            .then(() => {
                showSuccess("snackbar.deleted");

                setShowConfirmation(false);

                reload();
            })
            .catch((error) => handleCatch(error));
    };

    return (
        <>
            <Button
                {...{
                    label: "action.delete",
                    color: "error",
                    variant: "contained",
                    onClick: () => setShowConfirmation(true),
                    ...props,
                }}
            />

            <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)} fullWidth maxWidth="sm">
                <DialogTitle>{t("crud.confirmation.title")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t(confirmationLabel, {
                            name: result.representation,
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                        <Button onClick={() => setShowConfirmation(false)} variant="contained">
                            {t("action.cancel")}
                        </Button>
                        <Button variant="contained" color="error" onClick={() => deleteResult()}>
                            {t("action.delete")}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Delete;
export { DeleteProps };
