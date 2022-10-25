import QuerySortingInterface from "../../../components/Table/definitions/QuerySortingInterface";
import FiltersInterface from "../../../components/Table/definitions/FiltersInterface";
import ExportQueryFieldTranslatedInterface from "../../../components/Table/definitions/ExportQueryFieldTranslatedInterface";

interface ExportExcelQueryInterface {
    sorting: QuerySortingInterface;
    filters: FiltersInterface;
    fields: ExportQueryFieldTranslatedInterface[];
    filename: string;
    sheetName: string;
}

export default ExportExcelQueryInterface;
