import QuerySortingInterface from "forge-react/components/Table/definitions/QuerySortingInterface";
import FiltersInterface from "forge-react/components/Table/definitions/FiltersInterface";

interface ExportQueryFieldInterface {
    field: string;
    label: string;
}

interface ExportQueryInterface {
    sorting: QuerySortingInterface;
    filters: FiltersInterface;
    fields: ExportQueryFieldInterface[];
    fileName: string;
    sheetName: string;
}

export default ExportQueryInterface;
export { ExportQueryFieldInterface };
