import React from "react";
import { useTable } from "forge-react/components/Table/contexts/Table";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import RowInterface from "forge-react/components/Table/definitions/RowInterface";
import TablePagination from "forge-react/components/Table/components/TablePagination";
import TableFilters from "forge-react/components/Table/components/TableFilters";
import FieldsInterface from "forge-react/components/Form/definitions/FieldsInterface";

interface Props {
    row: RowInterface;
    filters?: FieldsInterface;
    actions?: React.ReactNode;
    disablePagination?: boolean;
}

const TableContent: React.FC<Props> = ({ row, filters, actions, disablePagination }: Props) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));
    const { rowCount, results, isSortingActive, getSortingDirection, onClickSorting } = useTable();

    const getHeadTableCell = (field: string) => {
        if (row[field]?.props?.disableSorting) {
            return t("label." + field);
        }

        return (
            <TableSortLabel
                active={isSortingActive(field)}
                direction={getSortingDirection(field)}
                onClick={() => onClickSorting(field)}
            >
                {t("label." + field)}
            </TableSortLabel>
        );
    };

    return (
        <>
            {filters && <TableFilters filters={filters} />}

            <Paper>
                <Box p={isSm ? 2 : 4}>
                    {actions}

                    {rowCount > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {Object.keys(row).map((field) => {
                                        return <TableCell key={field}>{getHeadTableCell(field)}</TableCell>;
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((result, key) => (
                                    <TableRow key={key}>
                                        {Object.keys(row).map((field) => {
                                            return (
                                                <TableCell key={field}>
                                                    {React.cloneElement(row[field], {
                                                        result,
                                                        field: row[field].props.field || field,
                                                    })}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                            {!disablePagination && <TablePagination />}
                        </Table>
                    ) : (
                        <Alert severity="info">{t("crud.noresults")}</Alert>
                    )}
                </Box>
            </Paper>
        </>
    );
};

export default TableContent;
export { Props };
