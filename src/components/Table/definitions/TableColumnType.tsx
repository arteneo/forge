import TableResultActionInterface from "@arteneo/forge/components/Table/definitions/TableResultActionInterface";
import TableColumnDisableSortingInterface from "@arteneo/forge/components/Table/definitions/TableColumnDisableSortingInterface";
import TableColumnDefaultHideInterface from "@arteneo/forge/components/Table/definitions/TableColumnDefaultHideInterface";

type TableColumnType = TableResultActionInterface &
    TableColumnDisableSortingInterface &
    TableColumnDefaultHideInterface;

export default TableColumnType;
