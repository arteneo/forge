import React from "react";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "../../contexts/Snackbar";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import Button, { ButtonProps } from "../../components/Common/Button";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import DialogConfirm from "../../components/Common/DialogConfirm";
import EndpointType from "../../definitions/EndpointType";
import { resolveEndpoint } from "../../utilities/resolve";

interface ButtonEndpointDialogConfirmRenderDialogParams {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

interface ButtonEndpointDialogConfirmProps extends ButtonProps {
    endpoint: EndpointType;
    onSuccess?: (defaultOnSuccess: () => void, response: AxiosResponse) => void;
    disableDialogCloseOnError?: boolean;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
    renderDialog?: (params: ButtonEndpointDialogConfirmRenderDialogParams) => React.ReactNode;
}

const ButtonEndpointDialogConfirm = ({
    endpoint,
    onSuccess,
    disableDialogCloseOnError = false,
    snackbarLabel = "buttonEndpointDialogConfirm.snackbar.success",
    snackbarLabelVariables = {},
    renderDialog = (params) => (
        <DialogConfirm
            {...{
                title: "buttonEndpointDialogConfirm.dialog.title",
                label: "buttonEndpointDialogConfirm.dialog.confirm",
                ...params,
            }}
        />
    ),
    ...buttonProps
}: ButtonEndpointDialogConfirmProps) => {
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
            .catch((error) => {
                if (!disableDialogCloseOnError) {
                    if (error?.response?.status === 409) {
                        setShowConfirmation(false);
                    }
                }
                return handleCatch(error);
            });
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

export default ButtonEndpointDialogConfirm;
export { ButtonEndpointDialogConfirmProps, ButtonEndpointDialogConfirmRenderDialogParams };
