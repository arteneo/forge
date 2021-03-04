import React from "react";
import { AxiosRequestConfig } from "axios";
import ButtonDownload, { ButtonDownloadProps } from "@arteneo/forge/components/Common/ButtonDownload";
import TableResultActionPathInterface from "@arteneo/forge/components/Table/definitions/TableResultActionPathInterface";
import TableResultActionResolveType from "@arteneo/forge/components/Table/definitions/TableResultActionResolveType";
import { resolveAnyOrFunction } from "@arteneo/forge/utils/resolve";
import { getIn } from "formik";

interface DownloadProps {
    requestConfig: TableResultActionResolveType<AxiosRequestConfig>;
}

type ResultButtonDownloadProps = Omit<ButtonDownloadProps, "requestConfig"> &
    TableResultActionPathInterface &
    DownloadProps;

const ResultButtonDownload = ({ requestConfig, result, field, path, ...props }: ResultButtonDownloadProps) => {
    if (typeof field === "undefined") {
        throw new Error("ResultButtonDownload component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ResultButtonDownload component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;
    const resolvedRequestConfig: AxiosRequestConfig = resolveAnyOrFunction(requestConfig, value, result, field);

    return (
        <ButtonDownload
            {...{
                requestConfig: resolvedRequestConfig,
                deniedAccessList: result?.deniedAccessList,
                ...props,
            }}
        />
    );
};

export default ResultButtonDownload;
export { ResultButtonDownloadProps };
