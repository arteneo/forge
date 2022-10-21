import QuerySortingInterface from "../../../components/Table/definitions/QuerySortingInterface";
import FiltersInterface from "../../../components/Table/definitions/FiltersInterface";
import ExportQueryFieldInterface from "../../../components/Table/definitions/ExportQueryFieldInterface";

interface ExportCsvQueryInterface {
    sorting: QuerySortingInterface;
    filters: FiltersInterface;
    fields: ExportQueryFieldInterface[];
    filename: string;
}

export default ExportCsvQueryInterface;
