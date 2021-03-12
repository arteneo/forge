import React from "react";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import ResultButtonEndpointConfirmation, {
    ResultButtonEndpointConfirmationProps,
} from "@arteneo/forge/components/Table/actions/result/ResultButtonEndpointConfirmation";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import ResultInterface from "@arteneo/forge/components/Table/definitions/ResultInterface";
import TableResultActionResolveType from "@arteneo/forge/components/Table/definitions/TableResultActionResolveType";
import { resolveAnyOrFunction } from "@arteneo/forge/utils/resolve";

interface DeleteInterface {
    endpoint?: TableResultActionResolveType<string>;
    confirmationLabel?: string;
}

type DeleteProps = DeleteInterface & Optional<ResultButtonEndpointConfirmationProps, "requestConfig">;

const Delete = ({
    endpoint,
    confirmationLabel = "crud.confirmation.delete",
    buttonProps,
    confirmationButtonProps,
    ...props
}: DeleteProps) => {
    const { reload, custom } = useTable();

    if (typeof endpoint === "undefined" && typeof custom?.endpoints?.delete === "undefined") {
        throw new Error(
            "Delete component: Missing required endpoint prop or endpoints.delete definition in custom variable used by Table context"
        );
    }

    return (
        <ResultButtonEndpointConfirmation
            {...{
                // eslint-disable-next-line
                requestConfig: (value: any, result: ResultInterface, field: string) => ({
                    method: "delete",
                    url: endpoint
                        ? resolveAnyOrFunction(endpoint, value, result, field)
                        : custom.endpoints.delete(value),
                }),
                onSuccess: (defaultOnSuccess: () => void) => {
                    defaultOnSuccess();
                    reload();
                },
                buttonProps: {
                    label: "action.delete",
                    accessKey: "delete",
                    color: "error",
                    variant: "contained",
                    ...buttonProps,
                },
                confirmationButtonProps: {
                    label: "action.delete",
                    color: "error",
                    variant: "contained",
                    ...confirmationButtonProps,
                },
                snackbarLabel: "snackbar.deleted",
                confirmationLabel,
                ...props,
            }}
        />
    );
};

export default Delete;
export { DeleteProps };
