import FiltersInterface from "../../../components/Table/definitions/FiltersInterface";
import SortingInterface from "../../../components/Table/definitions/SortingInterface";

interface TableQueryInterface {
    page: undefined | number;
    rowsPerPage: undefined | number;
    filters: undefined | FiltersInterface;
    sorting: undefined | SortingInterface;
}

export default TableQueryInterface;
