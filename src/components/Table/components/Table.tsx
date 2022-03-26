import React from "react";
import { TableProvider } from "../../../components/Table/contexts/Table";
import TableContent from "../../../components/Table/components/TableContent";
import RowInterface from "../../../components/Table/definitions/RowInterface";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";
import SortingInterface from "../../../components/Table/definitions/SortingInterface";
import FiltersInterface from "../../../components/Table/definitions/FiltersInterface";
import FilterValuesInterface from "../../../components/Table/definitions/FilterValuesInterface";
import TableFiltersFieldset from "../../../components/Table/components/TableFiltersFieldset";
import TableFilters from "../../../components/Table/components/TableFilters";

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
