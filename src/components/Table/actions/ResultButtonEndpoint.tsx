import { AxiosResponse } from "axios";
import { getIn } from "formik";
import React from "react";

import { ButtonEndpoint, type ButtonEndpointProps } from "../../../components/Common/ButtonEndpoint";
import { useTable } from "../../../components/Table/contexts/Table";
import { ColumnActionPathInterface } from "../../../components/Table/definitions/ColumnActionPathInterface";
import { ResultInterface } from "../../../components/Table/definitions/ResultInterface";
import { ResultResolveType } from "../../../components/Table/definitions/ResultResolveType";
import { EndpointType } from "../../../definitions/EndpointType";
import { resolveAnyOrFunction } from "../../../utilities/resolve";

interface ResultButtonEndpointSpecificProps {
    endpoint: ResultResolveType<EndpointType>;
    disableOnSuccessReload?: boolean;
    onSuccess?: (
        defaultOnSuccess: () => void,
        response: AxiosResponse,
        // eslint-disable-next-line
        value: any,
        result: ResultInterface,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        path?: string,
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
    path,
    ...props
}: ResultButtonEndpointProps) => {
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
        resolvedOnSuccess = (
            defaultOnSuccess: () => void,
            response: AxiosResponse,
            setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        ) => onSuccess(() => internalOnSuccess(defaultOnSuccess), response, value, result, setLoading, path);
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

export { ResultButtonEndpoint, type ResultButtonEndpointProps, type ResultButtonEndpointSpecificProps };
