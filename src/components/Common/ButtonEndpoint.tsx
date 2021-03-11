import React from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "@arteneo/forge/contexts/Snackbar";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import Button, { ButtonProps } from "@arteneo/forge/components/Common/Button";
import TranslateVariablesInterface from "@arteneo/forge/definitions/TranslateVariablesInterface";

interface ButtonEndpointInterface {
    requestConfig: AxiosRequestConfig;
    onSuccess?: (defaultOnSuccess: () => void, response: AxiosResponse) => void;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
}

type ButtonEndpointProps = ButtonEndpointInterface & ButtonProps;

const ButtonEndpoint = ({
    requestConfig,
    onSuccess,
    snackbarLabel = "snackbar.buttonEndpointSuccess",
    snackbarLabelVariables = {},
    ...props
}: ButtonEndpointProps) => {
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    const onClick = (): void => {
        showLoader();

        axios
            .request(requestConfig)
            .then((response: AxiosResponse) => {
                const defaultOnSuccess = () => {
                    showSuccess(snackbarLabel, snackbarLabelVariables);
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
        <Button
            {...{
                onClick: () => onClick(),
                ...props,
            }}
        />
    );
};

export default ButtonEndpoint;
export { ButtonEndpointProps };
