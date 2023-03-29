import React from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { FormikHelpers, FormikValues } from "formik";
import { useLocation } from "react-router-dom";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import { useHandleCatch, AXIOS_CANCELLED_UNMOUNTED } from "../../../contexts/HandleCatch";
import { useLoader } from "../../../contexts/Loader";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";
import ColumnsInterface from "../../../components/Table/definitions/ColumnsInterface";
import QueryInterface from "../../../components/Table/definitions/QueryInterface";
import QuerySortingInterface from "../../../components/Table/definitions/QuerySortingInterface";
import SortingDirection from "../../../components/Table/definitions/SortingDirection";
import FilterDefinition from "../../../components/Table/definitions/FilterDefinition";
import SortingInterface from "../../../components/Table/definitions/SortingInterface";
import FiltersInterface from "../../../components/Table/definitions/FiltersInterface";
import FilterValuesInterface from "../../../components/Table/definitions/FilterValuesInterface";
import { useTableQuery } from "../../../components/Table/contexts/TableQuery";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import BatchSelectedType from "../../../components/Table/definitions/BatchSelectedType";
import BatchQueryInterface from "../../../components/Table/definitions/BatchQueryInterface";
import ColumnNamesType from "../../../components/Table/definitions/ColumnNamesType";
import EndpointType from "../../../definitions/EndpointType";
import { resolveEndpoint } from "../../../utilities/resolve";
import { VisibleColumnInterface } from "../../../contexts/VisibleColumns";

interface TableContextProps {
    columns: ColumnsInterface;
    results: ResultInterface[];
    page: number;
    rowCount: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    disablePagination: boolean;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    // eslint-disable-next-line
    onChangeRowsPerPage: (event: any) => void;
    toolbar?: React.ReactNode;
    filters: FilterValuesInterface;
    filterFields?: FieldsInterface;
    filterClass?: { accordion: string; accordionActive: string };
    onSubmitFilters: (values: FormikValues, helpers: FormikHelpers<FormikValues>) => void;
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
    deselectAll: () => void;
    selectAll: () => void;
    addSelected: (id: number) => void;
    removeSelected: (id: number) => void;
    toggleSelected: (id: number) => void;
    reload: () => void;
    query: QueryInterface;
    batchQuery: BatchQueryInterface;
    visibleColumns: ColumnNamesType;
    defaultColumns: ColumnNamesType;
    visibleColumnsKey?: string;
    visibleColumnsEndpoint?: EndpointType;
    setVisibleColumns?: React.Dispatch<React.SetStateAction<ColumnNamesType>>;
    reloadVisibleColumns: () => void;
}

interface TableProviderProps {
    columns: ColumnsInterface;
    defaultColumns?: ColumnNamesType;
    children: React.ReactNode;
    endpoint: EndpointType;
    onLoadSuccess?: (
        defaultOnLoadSuccess: () => void,
        response: AxiosResponse,
        setResults: React.Dispatch<React.SetStateAction<ResultInterface[]>>,
        setRowCount: React.Dispatch<React.SetStateAction<number>>,
        setSelected: React.Dispatch<React.SetStateAction<BatchSelectedType>>,
        setVisibleColumns: React.Dispatch<React.SetStateAction<ColumnNamesType>>
    ) => void;
    getQuery?: (
        defaultGetQuery: () => QueryInterface,
        getFiltersDefinitions: (filterValues: FilterValuesInterface) => FiltersInterface,
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface,
        additionalSorting?: SortingInterface,
        additionalFilters?: FiltersInterface
    ) => QueryInterface;
    getBatchQuery?: (
        defaultGetBatchQuery: () => BatchQueryInterface,
        getFiltersDefinitions: (filterValues: FilterValuesInterface) => FiltersInterface,
        getQuery: (
            page: number,
            rowsPerPage: number,
            sorting: SortingInterface,
            filters: FilterValuesInterface,
            additionalSorting?: SortingInterface,
            additionalFilters?: FiltersInterface
        ) => QueryInterface,
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface,
        selected: BatchSelectedType,
        additionalSorting?: SortingInterface,
        additionalFilters?: FiltersInterface
    ) => BatchQueryInterface;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    disablePagination?: boolean;
    toolbar?: React.ReactNode;
    filters?: FieldsInterface;
    defaultFilters?: FilterValuesInterface;
    additionalFilters?: FiltersInterface;
    defaultSorting?: SortingInterface;
    additionalSorting?: SortingInterface;
    queryKey?: string;
    enableMultipleColumnsSorting?: boolean;
    enableBatchSelect?: boolean;
    visibleColumnsKey?: string;
    visibleColumnsEndpoint?: EndpointType;
    onVisibleColumnsLoadSuccess?: (
        defaultOnVisibleColumnsLoadSuccess: () => void,
        response: AxiosResponse,
        setVisibleColumns: React.Dispatch<React.SetStateAction<ColumnNamesType>>,
        visibleColumns: ColumnNamesType
    ) => void;
    onVisibleColumnsLoadCatch?: (
        defaultOnVisibleColumnsLoadCatch: () => void,
        error: AxiosError,
        setVisibleColumns: React.Dispatch<React.SetStateAction<ColumnNamesType>>,
        visibleColumns: ColumnNamesType
    ) => void;
    disableReloadOnLocationKeyChange?: boolean;
}

const contextInitial = {
    columns: {},
    results: [],
    page: 1,
    rowCount: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25, 50],
    disablePagination: false,
    onChangePage: () => {
        return;
    },
    onChangeRowsPerPage: () => {
        return;
    },
    filters: {},
    filterFields: {},
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
        page: 1,
        rowsPerPage: 10,
        sorting: [],
        filters: {},
    },
    batchQuery: {
        sorting: [],
        ids: [],
    },
    enableBatchSelect: false,
    selected: [],
    isSelected: () => false,
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
    visibleColumns: [],
    defaultColumns: [],
    reloadVisibleColumns: () => {
        return;
    },
};

const TableContext = React.createContext<TableContextProps>(contextInitial);

const TableProvider = ({
    children,
    columns,
    defaultColumns: _defaultColumns,
    endpoint,
    onLoadSuccess,
    getQuery: _getQuery,
    getBatchQuery: _getBatchQuery,
    rowsPerPage: _rowsPerPage = 10,
    rowsPerPageOptions = [5, 10, 25, 50],
    disablePagination = false,
    toolbar,
    filters: filterFields,
    defaultFilters = {},
    additionalFilters,
    defaultSorting = {},
    additionalSorting,
    queryKey: _queryKey,
    enableMultipleColumnsSorting,
    enableBatchSelect,
    visibleColumnsKey,
    visibleColumnsEndpoint,
    onVisibleColumnsLoadSuccess,
    onVisibleColumnsLoadCatch,
    disableReloadOnLocationKeyChange = false,
}: TableProviderProps) => {
    const location = useLocation();
    const queryKey = typeof _queryKey !== "undefined" ? _queryKey : location.pathname;
    const defaultColumns = typeof _defaultColumns === "undefined" ? Object.keys(columns) : _defaultColumns;

    const { setQuery, getQueryPage, getQueryRowsPerPage, getQueryFilters, getQuerySorting } = useTableQuery();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    const [results, setResults] = React.useState<ResultInterface[]>([]);
    const [page, setPage] = React.useState(getQueryPage(queryKey, 1));
    const [sorting, setSorting] = React.useState<SortingInterface>(getQuerySorting(queryKey, defaultSorting));
    const [filters, setFilters] = React.useState<FilterValuesInterface>(getQueryFilters(queryKey, defaultFilters));
    const [rowsPerPage, setRowsPerPage] = React.useState(getQueryRowsPerPage(queryKey, _rowsPerPage));
    const [rowCount, setRowCount] = React.useState(0);
    const [selected, setSelected] = React.useState<BatchSelectedType>([]);
    const [visibleColumns, setVisibleColumns] = React.useState<ColumnNamesType>(defaultColumns);

    const requestConfig = resolveEndpoint(endpoint);
    const visibleColumnsRequestConfig = resolveEndpoint(visibleColumnsEndpoint);

    useDeepCompareEffectNoCheck(
        () => load(page, rowsPerPage, sorting, filters),
        [
            requestConfig,
            page,
            rowsPerPage,
            sorting,
            disableReloadOnLocationKeyChange ? disableReloadOnLocationKeyChange : location.key,
        ]
    );
    useDeepCompareEffectNoCheck(() => loadVisibleColumns(), [visibleColumnsKey, visibleColumnsRequestConfig]);

    const load = (
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface,
        // eslint-disable-next-line
        extraOnLoadSuccess?: Function
    ) => {
        showLoader();

        setQuery(queryKey, page, rowsPerPage, sorting, filters);

        const axiosSource = axios.CancelToken.source();
        // requestConfig needs to be copied to avoid firing useDeepCompareEffectNoCheck
        const axiosRequestConfig = Object.assign({ cancelToken: axiosSource.token }, requestConfig);
        axiosRequestConfig.method = axiosRequestConfig.method ?? "post";
        axiosRequestConfig.data = getQuery(page, rowsPerPage, sorting, filters, additionalSorting, additionalFilters);

        axios
            .request(axiosRequestConfig)
            .then((response) => {
                if (typeof extraOnLoadSuccess !== "undefined") {
                    extraOnLoadSuccess();
                }

                const defaultOnLoadSuccess = () => {
                    if (response.data.results.length === 0 && page > 1) {
                        // This is enough to reload
                        setPage(1);
                        return;
                    }

                    setResults(response.data.results);
                    setRowCount(response.data.rowCount);
                    setSelected([]);

                    hideLoader();
                };

                if (typeof onLoadSuccess !== "undefined") {
                    onLoadSuccess(
                        defaultOnLoadSuccess,
                        response,
                        setResults,
                        setRowCount,
                        setSelected,
                        setVisibleColumns
                    );
                    return;
                }

                defaultOnLoadSuccess();
            })
            .catch((error) => handleCatch(error));

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    const loadVisibleColumns = () => {
        if (typeof visibleColumnsKey === "undefined") {
            return;
        }

        if (typeof visibleColumnsRequestConfig === "undefined") {
            throw Error("Please provide visibleColumnsEndpoint prop when using visibleColumnsKey");
        }

        const axiosSource = axios.CancelToken.source();
        // requestConfig needs to be copied to avoid firing useDeepCompareEffectNoCheck
        const axiosRequestConfig = Object.assign({ cancelToken: axiosSource.token }, visibleColumnsRequestConfig);
        axiosRequestConfig.method = axiosRequestConfig.method ?? "post";
        axiosRequestConfig.data = axiosRequestConfig.data ?? { tableKey: visibleColumnsKey };

        axios
            .request(axiosRequestConfig)
            .then((response) => {
                const defaultOnVisibleColumnsLoadSuccess = () => {
                    const visibleColumnsPayload = response.data;
                    if (visibleColumnsPayload.length === 0) {
                        setVisibleColumns(defaultColumns);
                        return;
                    }

                    const tableColumnNames = Object.keys(columns);

                    const visibleColumns = visibleColumnsPayload
                        .filter((column: VisibleColumnInterface) => tableColumnNames.includes(column.name))
                        .filter((column: VisibleColumnInterface) => (column.visible ? true : false))
                        .map((column: VisibleColumnInterface) => column.name);
                    setVisibleColumns(visibleColumns);
                };

                if (typeof onVisibleColumnsLoadSuccess !== "undefined") {
                    onVisibleColumnsLoadSuccess(
                        defaultOnVisibleColumnsLoadSuccess,
                        response,
                        setVisibleColumns,
                        defaultColumns
                    );
                    return;
                }

                defaultOnVisibleColumnsLoadSuccess();
            })
            .catch((error) => {
                const defaultOnVisibleColumnsLoadCatch = () => {
                    handleCatch(error);
                };

                if (typeof onVisibleColumnsLoadCatch !== "undefined") {
                    onVisibleColumnsLoadCatch(
                        defaultOnVisibleColumnsLoadCatch,
                        error,
                        setVisibleColumns,
                        defaultColumns
                    );
                    return;
                }

                defaultOnVisibleColumnsLoadCatch();
            });

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    const reload = (): void => {
        load(page, rowsPerPage, sorting, filters);
    };

    const getFilterDefinition = (values: FormikValues, field: string): undefined | FilterDefinition => {
        if (typeof values[field] === "undefined" || values[field] === "" || values[field] === null) {
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
        filters: FilterValuesInterface,
        additionalSorting?: SortingInterface,
        additionalFilters?: FiltersInterface
    ): QueryInterface => {
        const callableGetQuery = () =>
            defaultGetQuery(page, rowsPerPage, sorting, filters, additionalSorting, additionalFilters);

        if (typeof _getQuery !== "undefined") {
            return _getQuery(
                callableGetQuery,
                getFiltersDefinitions,
                page,
                rowsPerPage,
                sorting,
                filters,
                additionalSorting,
                additionalFilters
            );
        }

        return callableGetQuery();
    };

    const defaultGetQuery = (
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface,
        additionalSorting?: SortingInterface,
        additionalFilters?: FiltersInterface
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
        selected: BatchSelectedType,
        additionalSorting?: SortingInterface,
        additionalFilters?: FiltersInterface
    ): BatchQueryInterface => {
        const callableGetBatchQuery = () => {
            return defaultGetBatchQuery(
                page,
                rowsPerPage,
                sorting,
                filters,
                selected,
                additionalSorting,
                additionalFilters
            );
        };

        if (typeof _getBatchQuery !== "undefined") {
            return _getBatchQuery(
                callableGetBatchQuery,
                getFiltersDefinitions,
                getQuery,
                page,
                rowsPerPage,
                sorting,
                filters,
                selected,
                additionalSorting,
                additionalFilters
            );
        }

        return callableGetBatchQuery();
    };

    const defaultGetBatchQuery = (
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface,
        selected: BatchSelectedType,
        additionalSorting?: SortingInterface,
        additionalFilters?: FiltersInterface
    ): BatchQueryInterface => {
        const { sorting: querySorting } = getQuery(
            page,
            rowsPerPage,
            sorting,
            filters,
            additionalSorting,
            additionalFilters
        );

        return {
            sorting: querySorting,
            ids: selected,
        };
    };

    const onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number): void => {
        setPage(page);
    };

    // eslint-disable-next-line
    const onChangeRowsPerPage = (event: any): void => {
        const _rowsPerPage = parseInt(event?.target?.value, 10);
        setRowsPerPage(_rowsPerPage);
        setPage(1);
    };

    const onSubmitFilters = (values: FormikValues, helpers: FormikHelpers<FormikValues>): void => {
        setFilters(values);
        setPage(1);
        load(1, rowsPerPage, sorting, values, () => {
            helpers.setSubmitting(false);
        });
    };

    // eslint-disable-next-line
    const clearFilters = (setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void): void => {
        Object.keys(filters).forEach((field) => {
            setFieldValue(field, undefined);
        });

        setFilters({});
        setPage(1);
        load(page, rowsPerPage, sorting, {});
    };

    const isFiltersActive = (): boolean => {
        return Object.keys(filters).length > 0;
    };

    const isSortingActive = (field: string): boolean => {
        return sorting?.[field] ? true : false;
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

    return (
        <TableContext.Provider
            value={{
                columns,
                query: getQuery(page, rowsPerPage, sorting, filters, additionalSorting, additionalFilters),
                batchQuery: getBatchQuery(
                    page,
                    rowsPerPage,
                    sorting,
                    filters,
                    selected,
                    additionalSorting,
                    additionalFilters
                ),
                results,
                page,
                rowCount,
                rowsPerPage,
                rowsPerPageOptions,
                onChangePage,
                onChangeRowsPerPage,
                disablePagination,
                toolbar,
                filterFields,
                filters,
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
                deselectAll,
                selectAll,
                addSelected,
                removeSelected,
                toggleSelected,
                reload,
                visibleColumns,
                setVisibleColumns,
                defaultColumns,
                visibleColumnsKey,
                visibleColumnsEndpoint,
                reloadVisibleColumns: loadVisibleColumns,
            }}
        >
            {children}
        </TableContext.Provider>
    );
};

const useTable = (): TableContextProps => React.useContext(TableContext);

export { TableContext, TableContextProps, TableProvider, TableProviderProps, useTable };
