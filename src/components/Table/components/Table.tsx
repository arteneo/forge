import React from "react";
import { TableProvider } from "@arteneo/forge/components/Table/contexts/Table";
import TableContent from "@arteneo/forge/components/Table/components/TableContent";
import RowInterface from "@arteneo/forge/components/Table/definitions/RowInterface";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";
import SortingInterface from "@arteneo/forge/components/Table/definitions/SortingInterface";
import FiltersInterface from "@arteneo/forge/components/Table/definitions/FiltersInterface";
import FilterValuesInterface from "@arteneo/forge/components/Table/definitions/FilterValuesInterface";
import TooltipInterface from "@arteneo/forge/components/Table/definitions/TooltipInterface";

interface TableProps {
    row: RowInterface;
    endpoint: string;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    disablePagination?: boolean;
    filters?: FieldsInterface;
    filterClass?: { accordion: string; accordionActive: string };
    defaultFilters?: FilterValuesInterface;
    additionalFilters?: FiltersInterface;
    defaultSorting?: SortingInterface;
    additionalSorting?: SortingInterface;
    actions?: React.ReactNode;
    queryKey?: string;
    enableMultipleColumnsSorting?: boolean;
    enableBatchSelect?: boolean;
    title?: string;
    icon?: React.ReactElement;
    tableKey?: string;
    tableColumnEndpoint?: string;
    // eslint-disable-next-line
    custom?: any;
    tooltips?: TooltipInterface;
}

const Table = ({
    row,
    endpoint,
    rowsPerPage,
    rowsPerPageOptions,
    disablePagination,
    filters,
    filterClass,
    defaultFilters,
    additionalFilters,
    defaultSorting,
    additionalSorting,
    actions,
    queryKey,
    enableMultipleColumnsSorting,
    enableBatchSelect,
    title,
    icon,
    tableKey,
    tableColumnEndpoint,
    custom,
    tooltips,
}: TableProps) => {
    return (
        <TableProvider
            {...{
                endpoint,
                row,
                rowsPerPage,
                rowsPerPageOptions,
                filterFields: filters,
                filterClass,
                defaultFilters,
                additionalFilters,
                defaultSorting,
                additionalSorting,
                queryKey,
                enableMultipleColumnsSorting,
                enableBatchSelect,
                custom,
                tableKey,
                tableColumnEndpoint,
            }}
        >
            <TableContent {...{ row, filters, filterClass, actions, disablePagination, title, icon, tooltips }} />
        </TableProvider>
    );
};

export default Table;
export { TableProps };
