import ExportQueryFieldTranslatedInterface from "../../../components/Table/definitions/ExportQueryFieldTranslatedInterface";
import FiltersInterface from "../../../components/Table/definitions/FiltersInterface";
import QuerySortingInterface from "../../../components/Table/definitions/QuerySortingInterface";

interface ExportExcelQueryInterface {
    sorting: QuerySortingInterface;
    filters: FiltersInterface;
    fields: ExportQueryFieldTranslatedInterface[];
    filename: string;
    sheetName: string;
}

export default ExportExcelQueryInterface;
