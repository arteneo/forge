import React from "react";
import axios from "axios";
import Button, { ButtonProps } from "../../components/Common/Button";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import EndpointType from "../../components/Form/definitions/EndpointType";
import { resolveEndpoint } from "../../utils/resolve";

interface ButtonDownloadInterface {
    endpoint: EndpointType;
}

type ButtonDownloadProps = ButtonDownloadInterface & ButtonProps;

const ButtonDownload = ({ endpoint, ...props }: ButtonDownloadProps) => {
    const { showLoader, hideLoader } = useLoader();
    const handleCatch = useHandleCatch();

    const requestConfig = resolveEndpoint(endpoint);
    if (typeof requestConfig === "undefined") {
        throw new Error("Resolved requestConfig is undefined");
    }

    const onClick = () => {
        showLoader();

        requestConfig.responseType = requestConfig.responseType ?? "blob";

        axios
            .request(requestConfig)
            .then((response) => {
                hideLoader();

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", response.headers["content-type-filename"]);
                link.setAttribute("target", "_blank");
                document.body.appendChild(link);
                link.click();
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

export default ButtonDownload;
export { ButtonDownloadProps };
