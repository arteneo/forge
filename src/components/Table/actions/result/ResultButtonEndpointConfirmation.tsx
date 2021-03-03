import React from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ButtonEndpointConfirmation, {
    ButtonEndpointConfirmationProps,
} from "@arteneo/forge/components/Common/ButtonEndpointConfirmation";
import TableResultActionPathInterface from "@arteneo/forge/components/Table/definitions/TableResultActionPathInterface";
import TableResultActionResolveType from "@arteneo/forge/components/Table/definitions/TableResultActionResolveType";
import { resolveAnyOrFunction } from "@arteneo/forge/utils/resolve";
import { getIn } from "formik";
import ResultInterface from "@arteneo/forge/components/Table/definitions/ResultInterface";

interface EndpointConfirmationProps {
    requestConfig: TableResultActionResolveType<AxiosRequestConfig>;
    onSuccess?: (
        defaultOnSuccess: () => void,
        response: AxiosResponse,
        // eslint-disable-next-line
        value: any,
        result: ResultInterface,
        field: string
    ) => void;
}

type ResultButtonEndpointConfirmationProps = Omit<ButtonEndpointConfirmationProps, "requestConfig" | "onSuccess"> &
    TableResultActionPathInterface &
    EndpointConfirmationProps;

const ResultButtonEndpointConfirmation = ({
    requestConfig,
    onSuccess,
    result,
    field,
    path,
    ...props
}: ResultButtonEndpointConfirmationProps) => {
    if (typeof field === "undefined") {
        throw new Error("ResultButtonEndpointConfirmation component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ResultButtonEndpointConfirmation component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;
    const resolvedRequestConfig: AxiosRequestConfig = resolveAnyOrFunction(requestConfig, value, result, field);

    // Lines below are written like that due to formatting issue
    let resolvedOnSuccess = undefined;
    if (onSuccess) {
        resolvedOnSuccess = (defaultOnSuccess: () => void, response: AxiosResponse) =>
            onSuccess(defaultOnSuccess, response, value, result, field);
    }

    return (
        <ButtonEndpointConfirmation
            {...{
                requestConfig: resolvedRequestConfig,
                onSuccess: resolvedOnSuccess,
                confirmationLabelVariables: {
                    name: result.representation,
                },
                ...props,
            }}
        />
    );
};

export default ResultButtonEndpointConfirmation;
export { ResultButtonEndpointConfirmationProps };
