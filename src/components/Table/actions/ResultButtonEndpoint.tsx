import React from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ButtonEndpoint, { ButtonEndpointProps } from "../../../components/Common/ButtonEndpoint";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultResolveType from "../../../components/Table/definitions/ResultResolveType";
import { resolveAnyOrFunction } from "../../../utilities/resolve";
import EndpointType from "../../../components/Form/definitions/EndpointType";
import { getIn } from "formik";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { useTable } from "../../../components/Table/contexts/Table";

interface ResultButtonEndpointSpecificProps {
    endpoint: ResultResolveType<EndpointType>;
    disableOnSuccessReload?: boolean;
    onSuccess?: (
        defaultOnSuccess: () => void,
        response: AxiosResponse,
        // eslint-disable-next-line
        value: any,
        result: ResultInterface,
        path?: string
    ) => void;
}

type ResultButtonEndpointProps = Omit<ButtonEndpointProps, "endpoint" | "onSuccess"> &
    ColumnActionPathInterface &
    ResultButtonEndpointSpecificProps;

const ResultButtonEndpoint = ({
    endpoint,
    disableOnSuccessReload,
    onSuccess,
    result,
    columnName,
    path,
    ...props
}: ResultButtonEndpointProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("ResultButtonEndpoint component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ResultButtonEndpoint component: Missing required result prop");
    }

    const { reload } = useTable();
    const value = path ? getIn(result, path) : result;
    const resolvedEndpoint: EndpointType = resolveAnyOrFunction(endpoint, value, result, path);

    const internalOnSuccess = (defaultOnSuccess: () => void) => {
        defaultOnSuccess();

        if (!disableOnSuccessReload) {
            reload();
        }
    };

    // Lines below are written like that due to formatting issue
    let resolvedOnSuccess;
    if (onSuccess) {
        resolvedOnSuccess = (defaultOnSuccess: () => void, response: AxiosResponse) =>
            onSuccess(() => internalOnSuccess(defaultOnSuccess), response, value, result, path);
    } else {
        resolvedOnSuccess = internalOnSuccess;
    }

    return (
        <ButtonEndpoint
            {...{
                endpoint: resolvedEndpoint,
                onSuccess: resolvedOnSuccess,
                deny: result?.deny,
                ...props,
            }}
        />
    );
};

export default ResultButtonEndpoint;
export { ResultButtonEndpointProps };
