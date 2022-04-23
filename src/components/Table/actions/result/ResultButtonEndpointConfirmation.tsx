import React from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import ButtonEndpointConfirmation, {
    ButtonEndpointConfirmationProps,
} from "../../../../components/Common/ButtonEndpointConfirmation";
import TableResultActionPathInterface from "../../../../components/Table/definitions/TableResultActionPathInterface";
import TableResultActionResolveType from "../../../../components/Table/definitions/TableResultActionResolveType";
import { resolveAnyOrFunction } from "../../../../utils/resolve";
import { getIn } from "formik";
import ResultInterface from "../../../../components/Table/definitions/ResultInterface";
import { useTable } from "../../../../components/Table/contexts/Table";

interface EndpointConfirmationProps {
    requestConfig: TableResultActionResolveType<AxiosRequestConfig>;
    disableOnSuccessReload?: boolean;
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
    disableOnSuccessReload,
    onSuccess,
    result,
    field,
    path,
    buttonProps,
    ...props
}: ResultButtonEndpointConfirmationProps) => {
    if (typeof field === "undefined") {
        throw new Error("ResultButtonEndpointConfirmation component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ResultButtonEndpointConfirmation component: Missing required result prop");
    }

    const { reload } = useTable();
    const value = path ? getIn(result, path) : result;
    const resolvedRequestConfig: AxiosRequestConfig = resolveAnyOrFunction(requestConfig, value, result, field);

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
            onSuccess(() => internalOnSuccess(defaultOnSuccess), response, value, result, field);
    } else {
        resolvedOnSuccess = internalOnSuccess;
    }

    return (
        <ButtonEndpointConfirmation
            {...{
                requestConfig: resolvedRequestConfig,
                onSuccess: resolvedOnSuccess,
                buttonProps: {
                    deniedAccessList: result?.deniedAccessList,
                    ...buttonProps,
                },
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
