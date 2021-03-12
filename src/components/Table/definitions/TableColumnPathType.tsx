import TableResultActionPathInterface from "@arteneo/forge/components/Table/definitions/TableResultActionPathInterface";
import TableColumnDisableSortingInterface from "@arteneo/forge/components/Table/definitions/TableColumnDisableSortingInterface";
import TableColumnDefaultHideInterface from "@arteneo/forge/components/Table/definitions/TableColumnDefaultHideInterface";

type TableColumnPathType = TableResultActionPathInterface &
    TableColumnDisableSortingInterface &
    TableColumnDefaultHideInterface;

export default TableColumnPathType;
