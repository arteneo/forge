import React from "react";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import Batch, { BatchProps } from "@arteneo/forge/components/Table/actions/table/Batch";

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
type BatchDeleteProps = Optional<Optional<BatchProps, "endpoint">, "confirmationLabel">;

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
                endpoint: endpoint ? endpoint : custom.endpoints.batchDelete,
                ...props,
            }}
        />
    );
};

export default BatchDelete;
export { BatchDeleteProps };
