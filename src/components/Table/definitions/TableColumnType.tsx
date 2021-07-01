import TableResultActionInterface from "@arteneo/forge/components/Table/definitions/TableResultActionInterface";
import TableColumnDisableSortingInterface from "@arteneo/forge/components/Table/definitions/TableColumnDisableSortingInterface";
import TableColumnTooltipInterface from "@arteneo/forge/components/Table/definitions/TableColumnTooltipInterface";
import TableColumnDefaultHideInterface from "@arteneo/forge/components/Table/definitions/TableColumnDefaultHideInterface";

type TableColumnType = TableResultActionInterface &
    TableColumnDisableSortingInterface &
    TableColumnTooltipInterface &
    TableColumnDefaultHideInterface;

export default TableColumnType;
