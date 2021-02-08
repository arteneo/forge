import React from "react";
import axios from "axios";
import { FormikHelpers, FormikValues } from "formik";
import { useHandleCatch } from "forge-react/contexts/HandleCatch";
import { useLoader } from "forge-react/contexts/Loader";
import FieldsInterface from "forge-react/components/Form/definitions/FieldsInterface";
import RowInterface from "forge-react/components/Table/definitions/RowInterface";
import QueryInterface from "forge-react/components/Table/definitions/QueryInterface";
import QuerySortingInterface from "forge-react/components/Table/definitions/QuerySortingInterface";
import SortingDirection from "forge-react/components/Table/definitions/SortingDirection";
import FilterDefinition from "forge-react/components/Table/definitions/FilterDefinition";
import SortingInterface from "forge-react/components/Table/definitions/SortingInterface";
import FiltersInterface from "forge-react/components/Table/definitions/FiltersInterface";
import FilterValuesInterface from "forge-react/components/Table/definitions/FilterValuesInterface";
import { useTableQuery } from "forge-react/components/Table/contexts/TableQuery";
import { useLocation } from "react-router-dom";

interface ContextProps {
    row: RowInterface;
    // eslint-disable-next-line
    results: any[];
    page: number;
    rowCount: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    // eslint-disable-next-line
    onChangeRowsPerPage: (event: any) => void;
    filters: FiltersInterface;
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
    reload: () => void;
    query: QueryInterface;
    // eslint-disable-next-line
    custom?: any;
}

interface ProviderProps {
    row: RowInterface;
    children: React.ReactNode;
    endpoint: string;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    filterFields?: FieldsInterface;
    defaultFilters?: FilterValuesInterface;
    additionalFilters?: FiltersInterface;
    defaultSorting?: SortingInterface;
    additionalSorting?: SortingInterface;
    queryKey?: string;
    enableMultipleColumnsSorting?: boolean;
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
    reload: () => {
        return;
    },
};

const TableContext = React.createContext<ContextProps>(contextInitial);

const TableProvider: React.FC<ProviderProps> = ({
    children,
    row,
    endpoint,
    rowsPerPage: _rowsPerPage = 10,
    rowsPerPageOptions = [5, 10, 25, 50],
    filterFields,
    defaultFilters = {},
    additionalFilters,
    defaultSorting = {},
    additionalSorting,
    queryKey: _queryKey,
    enableMultipleColumnsSorting,
    custom,
}: ProviderProps) => {
    const location = useLocation();
    const queryKey = typeof _queryKey !== "undefined" ? _queryKey : location.pathname;
    const { setQuery, getQueryPage, getQueryRowsPerPage, getQueryFilters, getQuerySorting } = useTableQuery();

    const [results, setResults] = React.useState([]);
    const [page, setPage] = React.useState(getQueryPage(queryKey, 0));
    const [sorting, setSorting] = React.useState<SortingInterface>(getQuerySorting(queryKey, defaultSorting));
    const [filters, setFilters] = React.useState<FilterValuesInterface>(getQueryFilters(queryKey, defaultFilters));
    const [rowsPerPage, setRowsPerPage] = React.useState(getQueryRowsPerPage(queryKey, _rowsPerPage));
    const [rowCount, setRowCount] = React.useState(0);
    const [filtersExpanded, setFiltersExpanded] = React.useState(false);

    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();

    React.useEffect(() => load(page, rowsPerPage, sorting, filters), [endpoint, page, rowsPerPage, sorting]);

    const load = (
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface,
        // eslint-disable-next-line
        onLoadSuccess?: Function
    ): void => {
        showLoader();

        // getVisibleColumns();

        setQuery(queryKey, page, rowsPerPage, sorting, filters);

        axios
            .post(endpoint, getQuery(page, rowsPerPage, sorting, filters))
            .then((response) => {
                setResults(response.data.results);
                setRowCount(response.data.rowCount);

                // TODO
                // setSelected([]);
                // callbacks?

                hideLoader();

                if (onLoadSuccess) {
                    onLoadSuccess();
                }
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

    return (
        <TableContext.Provider
            value={{
                row,
                query: getQuery(page, rowsPerPage, sorting, filters),
                results,
                page,
                rowCount,
                rowsPerPage,
                rowsPerPageOptions,
                onChangePage,
                onChangeRowsPerPage,
                filters,
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
                reload,
                custom,
            }}
        >
            {children}
        </TableContext.Provider>
    );
};

const useTable = (): ContextProps => React.useContext(TableContext);

export { TableContext, TableProvider, useTable };
