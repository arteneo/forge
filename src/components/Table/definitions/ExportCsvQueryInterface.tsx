import QuerySortingInterface from "../../../components/Table/definitions/QuerySortingInterface";
import FiltersInterface from "../../../components/Table/definitions/FiltersInterface";
import ExportQueryFieldTranslatedInterface from "../../../components/Table/definitions/ExportQueryFieldTranslatedInterface";

interface ExportCsvQueryInterface {
    sorting: QuerySortingInterface;
    filters: FiltersInterface;
    fields: ExportQueryFieldTranslatedInterface[];
    filename: string;
}

export default ExportCsvQueryInterface;
