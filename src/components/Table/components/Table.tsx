import React from "react";
import { TableProvider } from "@arteneo/forge/components/Table/contexts/Table";
import TableContent from "@arteneo/forge/components/Table/components/TableContent";
import RowInterface from "@arteneo/forge/components/Table/definitions/RowInterface";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";
import SortingInterface from "@arteneo/forge/components/Table/definitions/SortingInterface";
import FiltersInterface from "@arteneo/forge/components/Table/definitions/FiltersInterface";
import FilterValuesInterface from "@arteneo/forge/components/Table/definitions/FilterValuesInterface";
import TableFiltersFieldset from "@arteneo/forge/components/Table/components/TableFiltersFieldset";
import TableFilters from "@arteneo/forge/components/Table/components/TableFilters";

interface TableProps {
    row: RowInterface;
    endpoint: string;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    disablePagination?: boolean;
    tableContentComponent?: React.ElementType;
    tableFiltersComponent?: React.ElementType;
    filtersFieldset?: React.ElementType;
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
    tooltipTranslatePrefix?: string;
    title?: string;
    icon?: React.ReactElement;
    tableKey?: string;
    tableColumnEndpoint?: string;
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
    filterClass,
    defaultFilters,
    additionalFilters,
    defaultSorting,
    additionalSorting,
    actions,
    queryKey,
    enableMultipleColumnsSorting,
    enableBatchSelect,
    tooltipTranslatePrefix = "tooltip.",
    title,
    icon,
    tableKey,
    tableColumnEndpoint,
    custom,
    filtersFieldset = TableFiltersFieldset,
    tableContentComponent = TableContent,
    tableFiltersComponent = TableFilters,
}: TableProps) => {
    const TableContentComponent = tableContentComponent;

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
            <TableContentComponent
                {...{
                    row,
                    filters,
                    filterClass,
                    actions,
                    disablePagination,
                    tooltipTranslatePrefix,
                    title,
                    icon,
                    tableFiltersComponent,
                    filtersFieldset,
                }}
            />
        </TableProvider>
    );
};

export default Table;
export { TableProps };
