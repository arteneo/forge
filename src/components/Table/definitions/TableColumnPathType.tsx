import TableResultActionPathInterface from "@arteneo/forge/components/Table/definitions/TableResultActionPathInterface";
import TableColumnDisableSortingInterface from "@arteneo/forge/components/Table/definitions/TableColumnDisableSortingInterface";
import TableColumnTooltipInterface from "@arteneo/forge/components/Table/definitions/TableColumnTooltipInterface";
import TableColumnDefaultHideInterface from "@arteneo/forge/components/Table/definitions/TableColumnDefaultHideInterface";

type TableColumnPathType = TableResultActionPathInterface &
    TableColumnDisableSortingInterface &
    TableColumnTooltipInterface &
    TableColumnDefaultHideInterface;

export default TableColumnPathType;
