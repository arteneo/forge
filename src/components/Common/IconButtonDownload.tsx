import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import axios, { AxiosRequestConfig } from "axios";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";

interface IconButtonDownloadInterface {
    requestConfig: AxiosRequestConfig;
}

type IconButtonDownloadProps = IconButtonDownloadInterface & IconButtonProps;

const IconButtonDownload = ({ requestConfig, ...props }: IconButtonDownloadProps) => {
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
        <IconButton
            {...{
                onClick: () => onClick(),
                ...props,
            }}
        />
    );
};

export default IconButtonDownload;
export { IconButtonDownloadProps };
