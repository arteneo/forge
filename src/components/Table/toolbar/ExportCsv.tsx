import React from "react";
import { useTranslation } from "react-i18next";
import { AxiosRequestConfig } from "axios";
import ExportCsvQueryInterface from "../../../components/Table/definitions/ExportCsvQueryInterface";
import ExportQueryFieldInterface from "../../../components/Table/definitions/ExportQueryFieldInterface";
import { useTable } from "../../../components/Table/contexts/Table";
import ButtonDownload, { ButtonDownloadProps } from "../../../components/Common/ButtonDownload";
import Optional from "../../../definitions/Optional";
import { resolveEndpoint } from "../../../utilities/resolve";

interface ExportCsvInterface {
    filename: string;
    modifyQuery?: (query: ExportCsvQueryInterface) => ExportCsvQueryInterface;
    skipFields?: string[];
}

type ExportCsvProps = Optional<ExportCsvInterface & ButtonDownloadProps, "endpoint">;

const ExportCsv = ({ endpoint, filename, modifyQuery, skipFields = ["actions"], ...props }: ExportCsvProps) => {
    const { t } = useTranslation();
    const { visibleColumns, query } = useTable();

    const fields: ExportQueryFieldInterface[] = visibleColumns
        .filter((column) => !skipFields.includes(column))
        .map((column) => ({
            field: column,
            label: t("label." + column),
        }));

    const exportQuery: ExportCsvQueryInterface = {
        sorting: query.sorting,
        filters: query.filters,
        fields,
        filename,
    };

    const resolvedRequestConfig: undefined | AxiosRequestConfig = resolveEndpoint(endpoint);
    if (typeof resolvedRequestConfig === "undefined") {
        throw new Error("ExportCsv component: Resolved requestConfig is undefined");
    }

    const requestConfig: AxiosRequestConfig = Object.assign(
        {
            method: "post",
            data: typeof modifyQuery !== "undefined" ? modifyQuery(exportQuery) : exportQuery,
            responseType: "blob",
        },
        resolvedRequestConfig
    );

    return (
        <ButtonDownload
            {...{
                endpoint: requestConfig,
                label: "action.exportCsv",
                color: "primary",
                variant: "contained",
                ...props,
            }}
        />
    );
};

export default ExportCsv;
export { ExportCsvProps, ExportCsvInterface };
