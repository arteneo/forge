import React from "react";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "../../contexts/Snackbar";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import DialogConfirm from "../../components/Common/DialogConfirm";
import EndpointType from "../../definitions/EndpointType";
import { resolveEndpoint } from "../../utilities/resolve";

interface IconButtonEndpointDialogConfirmRenderDialogParams {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

interface IconButtonEndpointDialogConfirmProps extends IconButtonProps {
    endpoint: EndpointType;
    onSuccess?: (defaultOnSuccess: () => void, response: AxiosResponse) => void;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
    renderDialog?: (params: IconButtonEndpointDialogConfirmRenderDialogParams) => React.ReactNode;
}

const IconButtonEndpointDialogConfirm = ({
    endpoint,
    onSuccess,
    snackbarLabel = "iconButtonEndpointDialogConfirm.snackbar.success",
    snackbarLabelVariables = {},
    renderDialog = (params) => (
        <DialogConfirm {...{ label: "iconButtonEndpointDialogConfirm.dialog.confirm", ...params }} />
    ),
    ...iconButtonProps
}: IconButtonEndpointDialogConfirmProps) => {
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
            <IconButton
                {...{
                    onClick: () => setShowConfirmation(true),
                    ...iconButtonProps,
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

export default IconButtonEndpointDialogConfirm;
export { IconButtonEndpointDialogConfirmProps, IconButtonEndpointDialogConfirmRenderDialogParams };
