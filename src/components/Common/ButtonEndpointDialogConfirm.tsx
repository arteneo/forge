import React from "react";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "../../contexts/Snackbar";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import Button, { ButtonProps } from "../../components/Common/Button";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import DialogConfirm from "../../components/Common/DialogConfirm";
import EndpointType from "../../components/Form/definitions/EndpointType";
import { resolveEndpoint } from "../../utils/resolve";

interface RenderDialogParams {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

interface ButtonEndpointDialogConfirmProps extends ButtonProps {
    endpoint: EndpointType;
    onSuccess?: (defaultOnSuccess: () => void, response: AxiosResponse) => void;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
    renderDialog?: (params: RenderDialogParams) => React.ReactNode;
}

const ButtonEndpointDialogConfirm = ({
    endpoint,
    onSuccess,
    snackbarLabel = "buttonEndpointDialogConfirm.snackbar.success",
    snackbarLabelVariables = {},
    renderDialog = (params) => (
        <DialogConfirm {...{ label: "buttonEndpointDialogConfirm.dialog.confirm", ...params }} />
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

export default ButtonEndpointDialogConfirm;
export { ButtonEndpointDialogConfirmProps, RenderDialogParams };
