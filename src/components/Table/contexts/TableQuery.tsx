import React from "react";
import SortingInterface from "@arteneo/forge/components/Table/definitions/SortingInterface";
import FilterValuesInterface from "@arteneo/forge/components/Table/definitions/FilterValuesInterface";
import TableQueryInterface from "@arteneo/forge/components/Table/definitions/TableQueryInterface";
import TableQueriesInterface from "@arteneo/forge/components/Table/definitions/TableQueriesInterface";

interface TableQueryContextProps {
    setQuery: (
        queryKey: string,
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface
    ) => void;
    getQueryPage: (queryKey: string, defaultPage: number) => number;
    getQueryRowsPerPage: (queryKey: string, defaultRowsPerPage: number) => number;
    getQueryFilters: (queryKey: string, defaultFilters: FilterValuesInterface) => FilterValuesInterface;
    getQuerySorting: (queryKey: string, defaultSorting: SortingInterface) => SortingInterface;
    setQueryPage: (queryKey: string, page: number, overrideQuery?: boolean) => void;
    setQueryRowsPerPage: (queryKey: string, rowsPerPage: number, overrideQuery?: boolean) => void;
    setQueryFilters: (queryKey: string, filters: FilterValuesInterface, overrideQuery?: boolean) => void;
    setQuerySorting: (queryKey: string, sorting: SortingInterface, overrideQuery?: boolean) => void;
}

interface TableQueryProviderProps {
    children: React.ReactNode;
}

const contextInitial = {
    setQuery: () => {
        return;
    },
    getQueryPage: () => 0,
    getQueryRowsPerPage: () => 0,
    getQueryFilters: () => ({}),
    getQuerySorting: () => ({}),
    setQueryPage: () => {
        return;
    },
    setQueryRowsPerPage: () => {
        return;
    },
    setQueryFilters: () => {
        return;
    },
    setQuerySorting: () => {
        return;
    },
};

const TableQueryContext = React.createContext<TableQueryContextProps>(contextInitial);

const TableQueryProvider = ({ children }: TableQueryProviderProps) => {
    const [queries, setQueries] = React.useState<TableQueriesInterface>({});

    const setQuery = (
        queryKey: string,
        page: number,
        rowsPerPage: number,
        sorting: SortingInterface,
        filters: FilterValuesInterface
    ): void => {
        setQueries((queries) => ({
            ...queries,
            [queryKey]: {
                page,
                rowsPerPage,
                sorting,
                filters,
            },
        }));
    };

    const getQueryPage = (queryKey: string, defaultPage: number): number => {
        const query: TableQueryInterface = queries?.[queryKey];

        if (!query || typeof query.page === "undefined") {
            return defaultPage;
        }

        return query.page;
    };

    const getQueryRowsPerPage = (queryKey: string, defaultRowsPerPage: number): number => {
        const query: TableQueryInterface = queries?.[queryKey];

        if (!query || typeof query.rowsPerPage === "undefined") {
            return defaultRowsPerPage;
        }

        return query.rowsPerPage;
    };

    const getQueryFilters = (queryKey: string, defaultFilters: FilterValuesInterface): FilterValuesInterface => {
        const query: TableQueryInterface = queries?.[queryKey];

        if (!query || typeof query.filters === "undefined") {
            return defaultFilters;
        }

        return query.filters;
    };

    const getQuerySorting = (queryKey: string, defaultSorting: SortingInterface): SortingInterface => {
        const query: TableQueryInterface = queries?.[queryKey];

        if (!query || typeof query.sorting === "undefined") {
            return defaultSorting;
        }

        return query.sorting;
    };

    const getEmptyQuery = (): TableQueryInterface => {
        return {
            page: undefined,
            rowsPerPage: undefined,
            filters: undefined,
            sorting: undefined,
        };
    };

    const setQueryPage = (queryKey: string, page: number, overrideQuery = true): void => {
        let query = getEmptyQuery();
        if (!overrideQuery && typeof queries?.[queryKey] !== "undefined") {
            query = queries[queryKey];
        }

        query.page = page;

        setQueries((queries) => ({
            ...queries,
            [queryKey]: query,
        }));
    };

    const setQueryRowsPerPage = (queryKey: string, rowsPerPage: number, overrideQuery = true): void => {
        let query = getEmptyQuery();
        if (!overrideQuery && typeof queries?.[queryKey] !== "undefined") {
            query = queries[queryKey];
        }

        query.rowsPerPage = rowsPerPage;

        setQueries((queries) => ({
            ...queries,
            [queryKey]: query,
        }));
    };

    const setQueryFilters = (queryKey: string, filters: FilterValuesInterface, overrideQuery = true): void => {
        let query = getEmptyQuery();
        if (!overrideQuery && typeof queries?.[queryKey] !== "undefined") {
            query = queries[queryKey];
        }

        query.filters = filters;

        setQueries((queries) => ({
            ...queries,
            [queryKey]: query,
        }));
    };

    const setQuerySorting = (queryKey: string, sorting: SortingInterface, overrideQuery = true): void => {
        let query = getEmptyQuery();
        if (!overrideQuery && typeof queries?.[queryKey] !== "undefined") {
            query = queries[queryKey];
        }

        query.sorting = sorting;

        setQueries((queries) => ({
            ...queries,
            [queryKey]: query,
        }));
    };

    return (
        <TableQueryContext.Provider
            value={{
                setQuery,
                getQueryPage,
                getQueryRowsPerPage,
                getQueryFilters,
                getQuerySorting,
                setQueryPage,
                setQueryRowsPerPage,
                setQueryFilters,
                setQuerySorting,
            }}
        >
            {children}
        </TableQueryContext.Provider>
    );
};

const useTableQuery = (): TableQueryContextProps => React.useContext(TableQueryContext);

export { TableQueryContext, TableQueryContextProps, TableQueryProvider, TableQueryProviderProps, useTableQuery };
