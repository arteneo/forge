import React from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "@arteneo/forge/contexts/Snackbar";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import IconButton, { IconButtonProps } from "@arteneo/forge/components/Common/IconButton";
import TranslateVariablesInterface from "@arteneo/forge/definitions/TranslateVariablesInterface";

interface IconButtonEndpointInterface {
    requestConfig: AxiosRequestConfig;
    onSuccess?: (defaultOnSuccess: () => void, response: AxiosResponse) => void;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
}

type IconButtonEndpointProps = IconButtonEndpointInterface & IconButtonProps;

const IconButtonEndpoint = ({
    requestConfig,
    onSuccess,
    snackbarLabel = "snackbar.iconButtonEndpointSuccess",
    snackbarLabelVariables = {},
    ...props
}: IconButtonEndpointProps) => {
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
        <IconButton
            {...{
                onClick: () => onClick(),
                ...props,
            }}
        />
    );
};

export default IconButtonEndpoint;
export { IconButtonEndpointProps };
