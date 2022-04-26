import React from "react";
import axios, { AxiosResponse } from "axios";
import { useSnackbar } from "../../contexts/Snackbar";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import Button, { ButtonProps } from "../../components/Common/Button";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import EndpointType from "../../components/Form/definitions/EndpointType";
import { resolveEndpoint } from "../../utilities/resolve";

interface ButtonEndpointInterface {
    endpoint: EndpointType;
    onSuccess?: (defaultOnSuccess: () => void, response: AxiosResponse) => void;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
}

type ButtonEndpointProps = ButtonEndpointInterface & ButtonProps;

const ButtonEndpoint = ({
    endpoint,
    onSuccess,
    snackbarLabel = "buttonEndpoint.snackbar.success",
    snackbarLabelVariables = {},
    ...props
}: ButtonEndpointProps) => {
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    const requestConfig = resolveEndpoint(endpoint);
    if (typeof requestConfig === "undefined") {
        throw new Error("Resolved requestConfig is undefined");
    }

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
