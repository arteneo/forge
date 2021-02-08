import FiltersInterface from "forge-react/components/Table/definitions/FiltersInterface";
import QuerySortingInterface from "forge-react/components/Table/definitions/QuerySortingInterface";

interface QueryInterface {
    page: number;
    rowsPerPage: number;
    sorting: QuerySortingInterface;
    filters: FiltersInterface;
}

export default QueryInterface;
