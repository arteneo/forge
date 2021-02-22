import FiltersInterface from "@arteneo/forge/components/Table/definitions/FiltersInterface";
import QuerySortingInterface from "@arteneo/forge/components/Table/definitions/QuerySortingInterface";

interface QueryInterface {
    page: number;
    rowsPerPage: number;
    sorting: QuerySortingInterface;
    filters: FiltersInterface;
}

export default QueryInterface;
