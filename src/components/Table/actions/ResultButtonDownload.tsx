import React from "react";
import { getIn } from "formik";
import ButtonDownload, { ButtonDownloadProps } from "../../../components/Common/ButtonDownload";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultResolveType from "../../../components/Table/definitions/ResultResolveType";
import { resolveAnyOrFunction } from "../../../utilities/resolve";
import EndpointType from "../../../definitions/EndpointType";

interface ResultButtonDownloadSpecificProps {
    endpoint: ResultResolveType<EndpointType>;
}

type ResultButtonDownloadProps = Omit<ButtonDownloadProps, "endpoint"> &
    ColumnActionPathInterface &
    ResultButtonDownloadSpecificProps;

const ResultButtonDownload = ({ endpoint, result, path, ...props }: ResultButtonDownloadProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultButtonDownload component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;
    const resolvedEndpoint: EndpointType = resolveAnyOrFunction(endpoint, value, result, path);

    return (
        <ButtonDownload
            {...{
                endpoint: resolvedEndpoint,
                deny: result?.deny,
                ...props,
            }}
        />
    );
};

export default ResultButtonDownload;
export { ResultButtonDownloadProps, ResultButtonDownloadSpecificProps };
