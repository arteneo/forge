import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";
import Wrapper from "@arteneo/forge/components/Table/components/Wrapper";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import { useSnackbar } from "@arteneo/forge/contexts/Snackbar";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import Button, { Props as ButtonProps } from "@arteneo/forge/components/Common/Button";

interface Props extends WrapperInterface {
    // result is added to props by TableContent
    // eslint-disable-next-line
    result?: any;
    // field is added to props by TableContent
    field?: string;
    disableSorting?: boolean;
    buttonProps?: ButtonProps;
}

const Delete: React.FC<Props> = ({
    result,
    field,
    buttonProps = {
        variant: "contained",
        color: "error",
    },
    wrapperComponent,
    wrapperComponentProps,
}: Props) => {
    if (typeof field === "undefined") {
        return null;
    }

    const { t } = useTranslation();
    const { reload, custom } = useTable();
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader } = useLoader();
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    if (typeof custom?.endpoints?.delete === "undefined") {
        throw new Error(
            "Delete component: Missing required endpoints.delete definition in custom variable used by Table context"
        );
    }

    const deleteResult = (): void => {
        showLoader();

        axios
            .delete(custom.endpoints.delete(result))
            .then(() => {
                showSuccess("snackbar.deleted");

                setShowConfirmation(false);

                reload();
            })
            .catch((error) => handleCatch(error));
    };

    const button = (
        <Button onClick={() => setShowConfirmation(true)} {...buttonProps}>
            {t("action.delete")}
        </Button>
    );

    return (
        <>
            <Wrapper
                {...{
                    wrapperComponent,
                    wrapperComponentProps,
                }}
            >
                {button}
            </Wrapper>

            <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)} fullWidth maxWidth="sm">
                <DialogTitle>{t("crud.confirmation.title")}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t("crud.confirmation.delete", {
                            name: result.representation,
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                        <Button onClick={() => setShowConfirmation(false)} variant="contained">
                            {t("action.cancel")}
                        </Button>
                        <Button onClick={() => deleteResult()} {...buttonProps}>
                            {t("action.delete")}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Delete;
