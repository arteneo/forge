import React from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle } from "@mui/material";
import { useSnackbar } from "../../contexts/Snackbar";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import Button, { ButtonProps } from "../../components/Common/Button";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import { Optional } from "../../utilities/TypescriptOperators";

interface IconButtonEndpointConfirmationProps {
    requestConfig: AxiosRequestConfig;
    onSuccess?: (defaultOnSuccess: () => void, response: AxiosResponse) => void;
    iconButtonProps: IconButtonProps;
    confirmationButtonBackProps?: ButtonProps;
    confirmationButtonProps?: ButtonProps;
    confirmationTitle?: string;
    confirmationTitleVariables?: TranslateVariablesInterface;
    confirmationContent?: React.ReactNode;
    confirmationLabel?: string;
    confirmationLabelVariables?: TranslateVariablesInterface;
    confirmationDialogProps?: Optional<DialogProps, "open">;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
}

const IconButtonEndpointConfirmation = ({
    requestConfig,
    onSuccess,
    iconButtonProps,
    confirmationButtonBackProps = {
        label: "action.back",
        variant: "contained",
    },
    confirmationButtonProps = {
        label: "action.confirm",
        variant: "contained",
        color: "primary",
    },
    confirmationTitle = "crud.confirmation.title",
    confirmationTitleVariables = {},
    confirmationContent,
    confirmationLabel = "crud.confirmation.label",
    confirmationLabelVariables = {},
    confirmationDialogProps = {
        fullWidth: true,
        maxWidth: "sm",
    },
    snackbarLabel = "snackbar.iconButtonEndpointConfirmationSuccess",
    snackbarLabelVariables = {},
}: IconButtonEndpointConfirmationProps) => {
    const { t } = useTranslation();
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const onClick = (): void => {
        showLoader();

        axios
            .request(requestConfig)
            .then((response: AxiosResponse) => {
                const defaultOnSuccess = () => {
                    showSuccess(snackbarLabel, snackbarLabelVariables);
                    setShowConfirmation(false);
                    hideLoader();
                };

                if (typeof onSuccess !== "undefined") {
                    onSuccess(defaultOnSuccess, response);
                    return;
                }

                defaultOnSuccess();
            })
            .catch((error) => handleCatch(error));
    };

    if (typeof confirmationContent === "undefined") {
        confirmationContent = <DialogContentText>{t(confirmationLabel, confirmationLabelVariables)}</DialogContentText>;
    }

    return (
        <>
            <IconButton
                {...{
                    onClick: () => setShowConfirmation(true),
                    ...iconButtonProps,
                }}
            />

            <Dialog open={showConfirmation} onClose={() => setShowConfirmation(false)} {...confirmationDialogProps}>
                <DialogTitle>{t(confirmationTitle, confirmationTitleVariables)}</DialogTitle>
                <DialogContent>{confirmationContent}</DialogContent>
                <DialogActions>
                    <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                        <Button onClick={() => setShowConfirmation(false)} {...confirmationButtonBackProps} />
                        <Button onClick={() => onClick()} {...confirmationButtonProps} />
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default IconButtonEndpointConfirmation;
export { IconButtonEndpointConfirmationProps };
