import QuerySortingInterface from "../../../components/Table/definitions/QuerySortingInterface";
import FiltersInterface from "../../../components/Table/definitions/FiltersInterface";
import ExportQueryFieldInterface from "../../../components/Table/definitions/ExportQueryFieldInterface";

interface ExportExcelQueryInterface {
    sorting: QuerySortingInterface;
    filters: FiltersInterface;
    fields: ExportQueryFieldInterface[];
    filename: string;
    sheetName: string;
}

export default ExportExcelQueryInterface;
