import React from "react";
import ButtonLink, { ButtonLinkProps } from "../../../components/Common/ButtonLink";
import ColumnInterface from "../../../components/Table/definitions/ColumnInterface";
import FilterValuesInterface from "../../../components/Table/definitions/FilterValuesInterface";
import { resolveAnyOrFunction } from "../../../utilities/resolve";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import SortingInterface from "../../../components/Table/definitions/SortingInterface";
import { useTableQuery } from "../../../components/Table/contexts/TableQuery";

type ResultRedirectProps = ButtonLinkProps & ColumnInterface;

interface ResultRedirectTableQueryProps extends ResultRedirectProps {
    queryKey?: string;
    page?: number | ((result: ResultInterface) => number);
    rowsPerPage?: number | ((result: ResultInterface) => number);
    sorting?: SortingInterface | ((result: ResultInterface) => SortingInterface);
    filters?: FilterValuesInterface | ((result: ResultInterface) => FilterValuesInterface);
}

const ResultRedirectTableQuery = ({
    result,
    to,
    queryKey,
    page,
    rowsPerPage,
    sorting,
    filters,
    ...props
}: ResultRedirectTableQueryProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultRedirectTableQuery component: Missing required result prop");
    }

    const { setQueryPage, setQueryRowsPerPage, setQuerySorting, setQueryFilters } = useTableQuery();
    let resolvedQueryKey: undefined | string = queryKey;
    if (typeof resolvedQueryKey === "undefined") {
        if (typeof to === "string") {
            resolvedQueryKey = to;
        } else {
            resolvedQueryKey = to?.pathname;
        }
    }

    if (typeof resolvedQueryKey === "undefined") {
        throw new Error("ResultRedirectTableQuery component: Could not determine query key");
    }

    const updateQuery = () => {
        const resolvedPage: undefined | number = resolveAnyOrFunction(page, result);
        const resolvedRowsPerPage: undefined | number = resolveAnyOrFunction(rowsPerPage, result);
        const resolvedSorting: undefined | SortingInterface = resolveAnyOrFunction(sorting, result);
        const resolvedFilters: undefined | FilterValuesInterface = resolveAnyOrFunction(filters, result);

        if (typeof resolvedPage !== "undefined") {
            setQueryPage(resolvedQueryKey as string, resolvedPage);
        }

        if (typeof resolvedRowsPerPage !== "undefined") {
            setQueryRowsPerPage(resolvedQueryKey as string, resolvedRowsPerPage);
        }

        if (typeof resolvedSorting !== "undefined") {
            setQuerySorting(resolvedQueryKey as string, resolvedSorting);
        }

        if (typeof resolvedFilters !== "undefined") {
            setQueryFilters(resolvedQueryKey as string, resolvedFilters);
        }
    };

    return (
        <ButtonLink
            {...{
                to,
                onClick: () => updateQuery(),
                ...props,
            }}
        />
    );
};

export default ResultRedirectTableQuery;
export { ResultRedirectTableQueryProps };
