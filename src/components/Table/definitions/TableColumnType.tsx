import TableResultActionInterface from "../../../components/Table/definitions/TableResultActionInterface";
import TableColumnDisableSortingInterface from "../../../components/Table/definitions/TableColumnDisableSortingInterface";
import TableColumnDefaultHideInterface from "../../../components/Table/definitions/TableColumnDefaultHideInterface";

type TableColumnType = TableResultActionInterface &
    TableColumnDisableSortingInterface &
    TableColumnDefaultHideInterface;

export default TableColumnType;
