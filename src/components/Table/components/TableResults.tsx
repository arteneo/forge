import { Alert, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { TableResultsPagination } from "../../../components/Table/components/TableResultsPagination";
import { useTable } from "../../../components/Table/contexts/Table";

const TableResults = () => {
    const { t } = useTranslation();
    const {
        columns,
        disablePagination,
        rowCount,
        results,
        isSortingActive,
        getSortingDirection,
        onClickSorting,
        enableBatchSelect,
        selected,
        isSelected,
        selectAll,
        deselectAll,
        toggleSelected,
        visibleColumns,
    } = useTable();

    const getHeadTableCell = (columnName: string) => {
        if (columns[columnName]?.props?.disableSorting) {
            return t("label." + columnName);
        }

        return (
            <TableSortLabel
                {...{
                    active: isSortingActive(columnName),
                    direction: getSortingDirection(columnName),
                    onClick: () => onClickSorting(columnName),
                }}
            >
                {t("label." + columnName)}
            </TableSortLabel>
        );
    };

    if (rowCount === 0) {
        return <Alert severity="info">{t("table.results.empty")}</Alert>;
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {enableBatchSelect && (
                        <TableCell padding="checkbox">
                            <Checkbox
                                {...{
                                    indeterminate: selected.length > 0 && selected.length < results.length,
                                    checked: results.length > 0 && selected.length === results.length,
                                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                        event.target.checked ? selectAll() : deselectAll();
                                    },
                                }}
                            />
                        </TableCell>
                    )}
                    {visibleColumns.map((columnName) => (
                        <TableCell key={columnName}>{getHeadTableCell(columnName)}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {results.map((result, key) => (
                    <TableRow key={key} hover={true} selected={isSelected(result.id)}>
                        {enableBatchSelect && (
                            <TableCell padding="checkbox" onClick={() => toggleSelected(result.id)}>
                                <Checkbox checked={isSelected(result.id)} />
                            </TableCell>
                        )}

                        {visibleColumns.map((columnName) => {
                            const column: undefined | React.ReactElement<any> = columns[columnName];
                            if (typeof column === "undefined") {
                                return null;
                            }

                            return (
                                <TableCell key={columnName}>
                                    {React.cloneElement(column, {
                                        result,
                                        columnName: column.props?.columnName ?? columnName,
                                    })}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableBody>
            {!disablePagination && <TableResultsPagination />}
        </Table>
    );
};

export { TableResults };
