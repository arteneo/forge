import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import axios from "axios";
import { useHandleCatch } from "../../contexts/HandleCatch";
import { useLoader } from "../../contexts/Loader";
import EndpointType from "../../definitions/EndpointType";
import { resolveEndpoint } from "../../utilities/resolve";
import { responseHeaderExtractFilename } from "../../utilities/common";

interface IconButtonDownloadInterface {
    endpoint: EndpointType;
}

type IconButtonDownloadProps = IconButtonDownloadInterface & IconButtonProps;

const IconButtonDownload = ({ endpoint, ...props }: IconButtonDownloadProps) => {
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

                const filename = responseHeaderExtractFilename(response.headers["content-disposition"]);
                if (typeof filename !== "undefined") {
                    link.setAttribute("download", filename);
                }

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
