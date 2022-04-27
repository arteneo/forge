import FilterValuesInterface from "../../../components/Table/definitions/FilterValuesInterface";
import SortingInterface from "../../../components/Table/definitions/SortingInterface";

interface TableQueryInterface {
    page: undefined | number;
    rowsPerPage: undefined | number;
    filters: undefined | FilterValuesInterface;
    sorting: undefined | SortingInterface;
}

export default TableQueryInterface;
