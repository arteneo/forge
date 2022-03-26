import TableResultActionPathInterface from "../../../components/Table/definitions/TableResultActionPathInterface";
import TableColumnDisableSortingInterface from "../../../components/Table/definitions/TableColumnDisableSortingInterface";
import TableColumnDefaultHideInterface from "../../../components/Table/definitions/TableColumnDefaultHideInterface";

type TableColumnPathType = TableResultActionPathInterface &
    TableColumnDisableSortingInterface &
    TableColumnDefaultHideInterface;

export default TableColumnPathType;
