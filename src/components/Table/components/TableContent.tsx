import React from "react";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import {
    Box,
    Checkbox,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import RowInterface from "@arteneo/forge/components/Table/definitions/RowInterface";
import TablePagination from "@arteneo/forge/components/Table/components/TablePagination";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";

interface TableContentProps {
    row: RowInterface;
    tableFiltersComponent: React.ElementType;
    filtersFieldset: React.ElementType;
    filters?: FieldsInterface;
    filterClass?: { accordion: string; accordionActive: string };
    actions?: React.ReactNode;
    disablePagination?: boolean;
    title?: string;
    icon?: React.ReactElement;
}

const useStyles = makeStyles(() => ({
    svgContainer: {
        display: "inline-flex",
    },
    titleContainer: {
        verticalAlign: "middle",
        marginBottom: "8px",
        display: "inline-flex",
    },
}));

const TableContent = ({
    row,
    filters,
    filterClass,
    actions,
    disablePagination,
    title,
    icon,
    tableFiltersComponent,
    filtersFieldset,
}: TableContentProps) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));
    const {
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
        columns,
    } = useTable();

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

    const classes = useStyles();
    const TableFiltersComponent = tableFiltersComponent;

    return (
        <>
            {filters && (
                <TableFiltersComponent filters={filters} filterClass={filterClass} filtersFieldset={filtersFieldset} />
            )}

            <Paper>
                {(icon || title) && (
                    <Typography>
                        {icon ? <span className={classes.svgContainer}>{icon}</span> : ""}
                        {title ? <span className={classes.titleContainer}>{t(title)}</span> : ""}
                    </Typography>
                )}

                <Box p={isSm ? 2 : 4}>
                    {actions}

                    {rowCount > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {enableBatchSelect && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                indeterminate={selected.length > 0 && selected.length < results.length}
                                                checked={results.length > 0 && selected.length === results.length}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                    event.target.checked ? selectAll() : deselectAll()
                                                }
                                            />
                                        </TableCell>
                                    )}
                                    {Object.keys(columns).map((field) => {
                                        return <TableCell key={field}>{getHeadTableCell(field)}</TableCell>;
                                    })}
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

                                        {Object.keys(columns).map((field) => {
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
export { TableContentProps };
