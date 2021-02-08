import React from "react";
import { TableProvider } from "forge-react/components/Table/contexts/Table";
import TableContent from "forge-react/components/Table/components/TableContent";
import RowInterface from "forge-react/components/Table/definitions/RowInterface";
import FieldsInterface from "forge-react/components/Form/definitions/FieldsInterface";
import SortingInterface from "forge-react/components/Table/definitions/SortingInterface";
import FiltersInterface from "forge-react/components/Table/definitions/FiltersInterface";
import FilterValuesInterface from "forge-react/components/Table/definitions/FilterValuesInterface";

interface Props {
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
    // eslint-disable-next-line
    custom?: any;
}

const Table: React.FC<Props> = ({
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
    custom,
}: Props) => {
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
                custom,
            }}
        >
            <TableContent {...{ row, filters, actions, disablePagination }} />
        </TableProvider>
    );
};

export default Table;
export { Props };
