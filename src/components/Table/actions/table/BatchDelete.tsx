import React from "react";
import { useTable } from "../../../../components/Table/contexts/Table";
import Batch, { BatchProps } from "../../../../components/Table/actions/table/Batch";
import { Optional } from "../../../../utilities/TypescriptOperators";

type BatchDeleteProps = Optional<BatchProps, "endpoint" | "confirmationLabel" | "snackbarLabel">;

const BatchDelete = ({ endpoint, ...props }: BatchDeleteProps) => {
    const { custom } = useTable();

    if (typeof endpoint === "undefined" && typeof custom?.endpoints?.batchDelete === "undefined") {
        throw new Error(
            "BatchDelete component: Missing required endpoint prop or endpoints.batchDelete definition in custom variable used by Table context"
        );
    }

    return (
        <Batch
            {...{
                label: "action.batchDelete",
                confirmationLabel: "crud.confirmation.batchDelete",
                snackbarLabel: "snackbar.batch.deleted",
                endpoint: endpoint ? endpoint : custom.endpoints.batchDelete,
                ...props,
            }}
        />
    );
};

export default BatchDelete;
export { BatchDeleteProps };
