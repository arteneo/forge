import React from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle } from "@mui/material";
import { useSnackbar } from "../../contexts/Snackbar";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import Button, { ButtonProps } from "../../components/Common/Button";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import { Optional } from "../../utils/TypescriptOperators";
import ConfirmDialog from "../../components/Common/ConfirmDialog";
import EndpointType from "../../components/Form/definitions/EndpointType";
import { resolveEndpoint } from "../../utils/resolve";

interface RenderDialogParams {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

interface ButtonEndpointConfirmProps {
    endpoint: EndpointType;
    onSuccess?: (defaultOnSuccess: () => void, response: AxiosResponse) => void;
    buttonProps?: ButtonProps;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
    renderDialog: (params: RenderDialogParams) => React.ReactNode;
}

const ButtonEndpointConfirm = ({
    endpoint,
    onSuccess,
    buttonProps = {
        variant: "contained",
        color: "primary",
    },
    snackbarLabel = "snackbar.ButtonEndpointConfirmSuccess",
    snackbarLabelVariables = {},
    renderDialog = (params) => <ConfirmDialog {...params} />,
}: ButtonEndpointConfirmProps) => {
    const { t } = useTranslation();
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();
    const [showConfirmation, setShowConfirmation] = React.useState(false);

    const requestConfig = resolveEndpoint(endpoint);

    if (typeof requestConfig === "undefined") {
        throw new Error("Resolved requestConfig is undefined");
    }

    const onConfirm = (): void => {
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

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowConfirmation(true),
                    ...buttonProps,
                }}
            />

            {renderDialog({
                open: showConfirmation,
                onClose: () => setShowConfirmation(false),
                onConfirm: () => onConfirm(),
            })}
        </>
    );
};

export default ButtonEndpointConfirm;
export { ButtonEndpointConfirmProps, RenderDialogParams };
