import React from "react";
import { resolveStringOrFunction } from "@arteneo/forge/utils/resolve";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import ButtonEndpointConfirmation, {
    ButtonEndpointConfirmationProps,
} from "@arteneo/forge/components/Common/ButtonEndpointConfirmation";
import ColumnInterface from "@arteneo/forge/components/Table/definitions/ColumnInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";

interface DeleteInterface {
    // eslint-disable-next-line
    endpoint?: string | ((result: any) => string);
    confirmationLabel?: string;
}
type DeleteProps = DeleteInterface & Optional<ButtonEndpointConfirmationProps, "requestConfig"> & ColumnInterface;

const Delete = ({ endpoint, result, confirmationLabel = "crud.confirmation.delete", ...props }: DeleteProps) => {
    const { reload, custom } = useTable();

    if (typeof endpoint === "undefined" && typeof custom?.endpoints?.delete === "undefined") {
        throw new Error(
            "Delete component: Missing required to prop or endpoints.delete definition in custom variable used by Table context"
        );
    }

    return (
        <ButtonEndpointConfirmation
            {...{
                requestConfig: {
                    method: "delete",
                    url: endpoint ? resolveStringOrFunction(endpoint, result) : custom.endpoints.delete(result),
                },
                onSuccess: (defaultOnSuccess: () => void) => {
                    defaultOnSuccess();
                    reload();
                },
                buttonProps: {
                    label: "action.delete",
                    color: "error",
                    variant: "contained",
                },
                confirmationButtonProps: {
                    label: "action.delete",
                    color: "error",
                    variant: "contained",
                },
                snackbarLabel: "snackbar.deleted",
                confirmationLabel,
                confirmationLabelVariables: {
                    name: result.representation,
                },
                ...props,
            }}
        />
    );
};

export default Delete;
export { DeleteProps };
