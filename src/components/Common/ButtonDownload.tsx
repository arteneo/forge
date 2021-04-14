import React from "react";
import Button, { ButtonProps } from "@arteneo/forge/components/Common/Button";
import axios, { AxiosRequestConfig } from "axios";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { useLoader } from "@arteneo/forge/contexts/Loader";

interface ButtonDownloadInterface {
    requestConfig: AxiosRequestConfig;
}

type ButtonDownloadProps = ButtonDownloadInterface & ButtonProps;

const ButtonDownload = ({ requestConfig, ...props }: ButtonDownloadProps) => {
    const { showLoader, hideLoader } = useLoader();
    const handleCatch = useHandleCatch();

    const onClick = () => {
        showLoader();

        axios
            .request(Object.assign({ responseType: "blob" }, requestConfig))
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
