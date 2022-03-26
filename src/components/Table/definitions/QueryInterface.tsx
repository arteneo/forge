import FiltersInterface from "../../../components/Table/definitions/FiltersInterface";
import QuerySortingInterface from "../../../components/Table/definitions/QuerySortingInterface";

interface QueryInterface {
    page: number;
    rowsPerPage: number;
    sorting: QuerySortingInterface;
    filters: FiltersInterface;
}

export default QueryInterface;
