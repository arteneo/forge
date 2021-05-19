import React from "react";
import axios from "axios";
import { FormikHelpers, FormikValues } from "formik";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "@arteneo/forge/contexts/HandleCatch";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";
import RowInterface from "@arteneo/forge/components/Table/definitions/RowInterface";
import QueryInterface from "@arteneo/forge/components/Table/definitions/QueryInterface";
import QuerySortingInterface from "@arteneo/forge/components/Table/definitions/QuerySortingInterface";
import SortingDirection from "@arteneo/forge/components/Table/definitions/SortingDirection";
import FilterDefinition from "@arteneo/forge/components/Table/definitions/FilterDefinition";
import SortingInterface from "@arteneo/forge/components/Table/definitions/SortingInterface";
import FiltersInterface from "@arteneo/forge/components/Table/definitions/FiltersInterface";
import FilterValuesInterface from "@arteneo/forge/components/Table/definitions/FilterValuesInterface";
import { useTableQuery } from "@arteneo/forge/components/Table/contexts/TableQuery";
import { useLocation } from "react-router-dom";
import ResultInterface from "@arteneo/forge/components/Table/definitions/ResultInterface";
import BatchSelectedType from "@arteneo/forge/components/Table/definitions/BatchSelectedType";
import BatchQueryInterface from "@arteneo/forge/components/Table/definitions/BatchQueryInterface";
import TableColumnsType from "@arteneo/forge/components/Table/definitions/TableColumnsType";

interface TableContextProps {
    row: RowInterface;
    results: ResultInterface[];
    page: number;
    rowCount: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    // eslint-disable-next-line
    onChangeRowsPerPage: (event: any) => void;
    filters: FiltersInterface;
    filterClass?: { accordion: string; accordionActive: string };
    filtersExpanded: boolean;
    setFiltersExpanded: (filtersExpanded: boolean) => void;
    onSubmitFilters: (
        values: FormikValues,
        helpers: FormikHelpers<FormikValues>,
        // eslint-disable-next-line
        setObject: (object: any) => void
    ) => void;
    isFiltersActive: () => boolean;
    // eslint-disable-next-line
    clearFilters: (setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => void;
    sorting: SortingInterface;
    isSortingActive: (field: string) => boolean;
    getSortingDirection: (field: string) => undefined | SortingDirection;
    onClickSorting: (field: string) => void;
    applySorting: (field: string, direction: SortingDirection) => void;
    removeSorting: (field: string) => void;
    enableBatchSelect?: boolean;
    selected: number[];
    isSelected: (id: number) => boolean;
    isLoaded: () => boolean;
    deselectAll: () => void;
    selectAll: () => void;
    addSelected: (id: number) => void;
    removeSelected: (id: number) => void;
    toggleSelected: (id: number) => void;
    reload: () => void;
    query: QueryInterface;
    batchQuery: BatchQueryInterface;
    columns: RowInterface;
    defaultColumns: RowInterface;
    updateColumns: (tableColumns: ResultInterface[]) => void;
    tableKey?: string;
    tableColumnEndpoint?: string;
    // eslint-disable-next-line
    custom?: any;
}

interface TableProviderProps {
    row: RowInterface;
    children: React.ReactNode;
    endpoint: string;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    filterFields?: FieldsInterface;
    filterClass?: { accordion: string; accordionActive: string };
    defaultFilters?: FilterValuesInterface;
    additionalFilters?: FiltersInterface;
    defaultSorting?: SortingInterface;
    additionalSorting?: SortingInterface;
    queryKey?: string;
    enableMultipleColumnsSorting?: boolean;
    enableBatchSelect?: boolean;
    tableKey?: string;
    tableColumnEndpoint?: string;
    // eslint-disable-next-line
    custom?: any;
}

const contextInitial = {
    row: {},
    results: [],
    page: 0,
    rowCount: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25, 50],
    onChangePage: () => {
        return;
    },
    onChangeRowsPerPage: () => {
        return;
    },
    filters: {},
    filtersExpanded: false,
    setFiltersExpanded: () => {
        return;
    },
    onSubmitFilters: () => {
        return;
    },
    isFiltersActive: () => {
        return false;
    },
    clearFilters: () => {
        return;
    },
    sorting: {},
    isSortingActive: () => false,
    getSortingDirection: () => {
        return undefined;
    },
    onClickSorting: () => false,
    applySorting: () => {
        return;
    },
    removeSorting: () => {
        return;
    },
    query: {
        page: 0,
        rowsPerPage: 10,
        sorting: [],
        filters: {},
    },
    batchQuery: {
        page: 0,
        rowsPerPage: 10,
        sorting: [],
        filters: {},
        selected: [],
    },
    enableBatchSelect: false,
    selected: [],
    isSelected: () => false,
    isLoaded: () => false,
    deselectAll: () => {
        return;
    },
    selectAll: () => {
        return;
    },
    addSelected: () => {
        return;
    },
    removeSelected: () => {
        return;
    },
    toggleSelected: () => {
        return;
    },
    reload: () => {
        return;
    },
    columns: {},
    defaultColumns: {},
    updateColumns: () => {
        return;
    },
};

const TableContext = React.createContext<TableContextProps>(contextInitial);

const TableProvider = ({
    children,
    row,
    endpoint,
    rowsPerPage: _rowsPerPage = 10,
    rowsPerPageOptions = [5, 10, 25, 50],
    filterFields,
    filterClass,
    defaultFilters = {},
    additionalFilters,
    defaultSorting = {},
    additionalSorting,
    queryKey: _queryKey,
    enableMultipleColumnsSorting,
    enableBatchSelect,
    tableKey,
    tableColumnEndpoint,
    custom,
}: TableProviderProps) => {
    const location = useLocation();
    const queryKey = typeof _queryKey !== "undefined" ? _queryKey : location.pathname;
    const { setQuery, getQueryPage, getQueryRowsPerPage, getQueryFilters, getQuerySorting } = useTableQuery();

    const [results, setResults] = React.useState<ResultInterface[]>([]);
    const [page, setPage] = React.useState(getQueryPage(queryKey, 0));
    const [sorting, setSorting] = React.useState<SortingInterface>(getQuerySorting(queryKey, defaultSorting));
    const [filters, setFilters] = React.useState<FilterValuesInterface>(getQueryFilters(queryKey, defaultFilters));
    const [rowsPerPage, setRowsPerPage] = React.useState(getQueryRowsPerPage(queryKey, _rowsPerPage));
    const [rowCount, setRowCount] = React.useState(0);
    const [filtersExpanded, setFiltersExpanded] = React.useState(false);
    const [selected, setSelected] = React.useState<BatchSelectedType>([]);
    const [columns, setColumns] = React.useState<TableColumnsType>(undefined);
    const [dataLoaded, setDataLoaded] = React.useState(false);

    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    React.useEffect(() => load(page, rowsPerPage, sorting, filters), [endpoint, page, rowsPerPage, sorting]);
    React.useEffect(() => loadColumns(), [tableKey, tableColumnEndpoint]);

    const load = (
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface,
        // eslint-disable-next-line
        onLoadSuccess?: Function
    ) => {
        showLoader();

        setQuery(queryKey, page, rowsPerPage, sorting, filters);

        const axiosSource = axios.CancelToken.source();

        axios
            .post(endpoint, getQuery(page, rowsPerPage, sorting, filters), {
                cancelToken: axiosSource.token,
            })
            .then((response) => {
                setResults(response.data.results);
                setRowCount(response.data.rowCount);
                setSelected([]);

                hideLoader();
                setDataLoaded(true);

                if (onLoadSuccess) {
                    onLoadSuccess();
                }
            })
            .catch((error) => handleCatch(error));

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    const loadColumns = (): void => {
        if (typeof tableKey === "undefined") {
            return;
        }

        if (typeof tableColumnEndpoint === "undefined") {
            throw Error("Please provide tableColumnEndpoint prop when using tableKey");
        }

        axios
            .post(tableColumnEndpoint, {
                tableKey,
            })
            .then((response) => {
                if (response.status !== 204) {
                    updateColumns(response.data);
                    return;
                }

                setColumns(undefined);
            })
            .catch((error) => handleCatch(error));
    };

    const reload = (): void => {
        if (page !== 0) {
            // Enough to trigger load
            setPage(0);
            return;
        }

        load(page, rowsPerPage, sorting, filters);
    };

    const getFilterDefinition = (values: FormikValues, field: string): undefined | FilterDefinition => {
        if (typeof values[field] === "undefined" || values[field] === "") {
            return undefined;
        }

        return {
            filterBy: (filterFields && filterFields[field]?.props?.filterBy) || field,
            filterType: (filterFields && filterFields[field]?.props?.filterType) || "like",
            filterValue: values[field],
        };
    };

    const getFiltersDefinitions = (filterValues: FilterValuesInterface): FiltersInterface => {
        const filters: FiltersInterface = {};

        Object.keys(filterValues).forEach((field: string) => {
            const filterDefinition = getFilterDefinition(filterValues, field);

            if (typeof filterDefinition !== "undefined") {
                filters[field] = filterDefinition;
            }
        });

        return filters;
    };

    const getQuery = (
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface
    ): QueryInterface => {
        const joinedSorting: SortingInterface = {
            ...sorting,
            ...additionalSorting,
        };

        const _sorting: QuerySortingInterface = Object.keys(joinedSorting).map((field) => {
            return {
                field: field,
                direction: joinedSorting[field],
            };
        });

        return {
            page: page,
            rowsPerPage: rowsPerPage,
            sorting: _sorting,
            filters: {
                ...getFiltersDefinitions(filters),
                ...additionalFilters,
            },
        };
    };

    const getBatchQuery = (
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface,
        selected: BatchSelectedType
    ): BatchQueryInterface => {
        return {
            ...getQuery(page, rowsPerPage, sorting, filters),
            selected,
        };
    };

    const onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number): void => {
        setPage(page);
    };

    // eslint-disable-next-line
    const onChangeRowsPerPage = (event: any): void => {
        const _rowsPerPage = parseInt(event?.target?.value, 10);
        setRowsPerPage(_rowsPerPage);
        setPage(0);
    };

    const onSubmitFilters = (values: FormikValues, helpers: FormikHelpers<FormikValues>): void => {
        setFilters(values);
        load(page, rowsPerPage, sorting, values, () => {
            helpers.setSubmitting(false);
        });
    };

    // eslint-disable-next-line
    const clearFilters = (setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void): void => {
        Object.keys(filters).forEach((field) => {
            setFieldValue(field, undefined);
        });

        setFilters({});
        setPage(0);
        load(page, rowsPerPage, sorting, {});
    };

    const isFiltersActive = (): boolean => {
        return Object.keys(filters).length > 0;
    };

    const isSortingActive = (field: string): boolean => {
        return !!sorting?.[field];
    };

    const getSortingDirection = (field: string): undefined | SortingDirection => {
        return sorting?.[field] ? sorting[field] : undefined;
    };

    const onClickSorting = (field: string): void => {
        const direction = getSortingDirection(field);

        if (typeof direction === "undefined") {
            applySorting(field, "asc");
            return;
        }

        if (direction === "asc") {
            applySorting(field, "desc");
            return;
        }

        removeSorting(field);
    };

    const applySorting = (field: string, direction: SortingDirection): void => {
        setSorting((sorting) => {
            if (enableMultipleColumnsSorting) {
                return {
                    ...sorting,
                    [field]: direction,
                };
            }

            return {
                [field]: direction,
            };
        });
    };

    const removeSorting = (field: string): void => {
        setSorting((sorting) => {
            const _sorting = Object.assign({}, sorting);
            delete _sorting[field];
            return _sorting;
        });
    };

    const isSelected = (id: number): boolean => {
        return selected.indexOf(id) !== -1;
    };

    const isLoaded = (): boolean => {
        return dataLoaded;
    };

    const deselectAll = (): void => {
        setSelected([]);
    };

    const selectAll = (): void => {
        setSelected(results.map((result) => result.id));
    };

    const addSelected = (id: number): void => {
        setSelected((selected) => selected.concat(id));
    };

    const removeSelected = (id: number): void => {
        setSelected((selected) => selected.filter((selectedId) => selectedId !== id));
    };

    const toggleSelected = (id: number): void => {
        if (isSelected(id)) {
            removeSelected(id);
        } else {
            addSelected(id);
        }
    };

    const updateColumns = (tableColumns: ResultInterface[]): void => {
        setColumns(tableColumns.map((result) => result.representation));
    };

    const getDefaultColumns = (): RowInterface => {
        if (typeof tableKey !== "undefined") {
            return Object.keys(row).reduce((rowResult, column) => {
                if (row[column]?.props?.defaultHide) {
                    return rowResult;
                }

                return {
                    ...rowResult,
                    [column]: row[column],
                };
            }, {});
        }

        return row;
    };

    const getColumns = (): RowInterface => {
        if (typeof tableKey !== "undefined") {
            if (typeof columns !== "undefined") {
                return columns.reduce((rowResult, column) => {
                    if (typeof row?.[column] === "undefined") {
                        return rowResult;
                    }

                    return {
                        ...rowResult,
                        [column]: row[column],
                    };
                }, {});
            }

            return getDefaultColumns();
        }

        return row;
    };

    return (
        <TableContext.Provider
            value={{
                row,
                query: getQuery(page, rowsPerPage, sorting, filters),
                batchQuery: getBatchQuery(page, rowsPerPage, sorting, filters, selected),
                results,
                page,
                rowCount,
                rowsPerPage,
                rowsPerPageOptions,
                onChangePage,
                onChangeRowsPerPage,
                filters,
                filterClass,
                filtersExpanded,
                setFiltersExpanded,
                isFiltersActive,
                onSubmitFilters,
                clearFilters,
                sorting,
                isSortingActive,
                getSortingDirection,
                onClickSorting,
                applySorting,
                removeSorting,
                enableBatchSelect,
                selected,
                isSelected,
                isLoaded,
                deselectAll,
                selectAll,
                addSelected,
                removeSelected,
                toggleSelected,
                reload,
                columns: getColumns(),
                defaultColumns: getDefaultColumns(),
                updateColumns,
                tableKey,
                tableColumnEndpoint,
                custom,
            }}
        >
            {children}
        </TableContext.Provider>
    );
};

const useTable = (): TableContextProps => React.useContext(TableContext);

export { TableContext, TableContextProps, TableProvider, TableProviderProps, useTable };
