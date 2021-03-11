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
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";

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

// Wrapper interface props are passed directly by ActionsColumn. We need to pass the further to buttonProps
type ResultButtonEndpointConfirmationProps = Omit<ButtonEndpointConfirmationProps, "requestConfig" | "onSuccess"> &
    TableResultActionPathInterface &
    EndpointConfirmationProps &
    WrapperInterface;

const ResultButtonEndpointConfirmation = ({
    requestConfig,
    disableOnSuccessReload,
    onSuccess,
    result,
    field,
    path,
    buttonProps,
    wrapperComponent,
    wrapperComponentProps,
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
                    wrapperComponent,
                    wrapperComponentProps,
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
