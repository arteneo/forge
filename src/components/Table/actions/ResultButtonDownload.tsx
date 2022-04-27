import React from "react";
import ButtonDownload, { ButtonDownloadProps } from "../../../components/Common/ButtonDownload";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultResolveType from "../../../components/Table/definitions/ResultResolveType";
import { resolveAnyOrFunction } from "../../../utilities/resolve";
import EndpointType from "../../../components/Form/definitions/EndpointType";
import { getIn } from "formik";

interface ResultButtonDownloadSpecificProps {
    endpoint: ResultResolveType<EndpointType>;
}

type ResultButtonDownloadProps = Omit<ButtonDownloadProps, "endpoint"> &
    ColumnActionPathInterface &
    ResultButtonDownloadSpecificProps;

const ResultButtonDownload = ({ endpoint, result, columnName, path, ...props }: ResultButtonDownloadProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("ResultButtonDownload component: Missing required columnName prop");
    }

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
