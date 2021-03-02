import React from "react";
import { TableProvider } from "@arteneo/forge/components/Table/contexts/Table";
import TableContent from "@arteneo/forge/components/Table/components/TableContent";
import RowInterface from "@arteneo/forge/components/Table/definitions/RowInterface";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";
import SortingInterface from "@arteneo/forge/components/Table/definitions/SortingInterface";
import FiltersInterface from "@arteneo/forge/components/Table/definitions/FiltersInterface";
import FilterValuesInterface from "@arteneo/forge/components/Table/definitions/FilterValuesInterface";

interface TableProps {
    row: RowInterface;
    endpoint: string;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    disablePagination?: boolean;
    filters?: FieldsInterface;
    defaultFilters?: FilterValuesInterface;
    additionalFilters?: FiltersInterface;
    defaultSorting?: SortingInterface;
    additionalSorting?: SortingInterface;
    actions?: React.ReactNode;
    queryKey?: string;
    enableMultipleColumnsSorting?: boolean;
    enableBatchSelect?: boolean;
    // eslint-disable-next-line
    custom?: any;
}

const Table = ({
    row,
    endpoint,
    rowsPerPage,
    rowsPerPageOptions,
    disablePagination,
    filters,
    defaultFilters,
    additionalFilters,
    defaultSorting,
    additionalSorting,
    actions,
    queryKey,
    enableMultipleColumnsSorting,
    enableBatchSelect,
    custom,
}: TableProps) => {
    return (
        <TableProvider
            {...{
                endpoint,
                row,
                rowsPerPage,
                rowsPerPageOptions,
                filterFields: filters,
                defaultFilters,
                additionalFilters,
                defaultSorting,
                additionalSorting,
                queryKey,
                enableMultipleColumnsSorting,
                enableBatchSelect,
                custom,
            }}
        >
            <TableContent {...{ row, filters, actions, disablePagination }} />
        </TableProvider>
    );
};

export default Table;
export { TableProps };
