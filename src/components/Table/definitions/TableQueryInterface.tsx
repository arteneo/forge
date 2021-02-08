import FiltersInterface from "forge-react/components/Table/definitions/FiltersInterface";
import SortingInterface from "forge-react/components/Table/definitions/SortingInterface";

interface TableQueryInterface {
    page: undefined | number;
    rowsPerPage: undefined | number;
    filters: undefined | FiltersInterface;
    sorting: undefined | SortingInterface;
}

export default TableQueryInterface;
