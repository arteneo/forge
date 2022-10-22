import React from "react";
import { useTranslation } from "react-i18next";
import { AxiosRequestConfig } from "axios";
import ExportExcelQueryInterface from "../../../components/Table/definitions/ExportExcelQueryInterface";
import ExportQueryFieldInterface from "../../../components/Table/definitions/ExportQueryFieldInterface";
import { useTable } from "../../../components/Table/contexts/Table";
import ButtonDownload, { ButtonDownloadProps } from "../../../components/Common/ButtonDownload";
import Optional from "../../../definitions/Optional";
import { resolveEndpoint } from "../../../utilities/resolve";

interface ExportExcelInterface {
    filename: string;
    sheetName: string;
    modifyQuery?: (query: ExportExcelQueryInterface) => ExportExcelQueryInterface;
    skipFields?: string[];
}

type ExportExcelProps = Optional<ExportExcelInterface & ButtonDownloadProps, "endpoint">;

const ExportExcel = ({
    endpoint,
    filename,
    sheetName,
    modifyQuery,
    skipFields = ["actions"],
    ...props
}: ExportExcelProps) => {
    const { t } = useTranslation();
    const { visibleColumns, query } = useTable();

    const fields: ExportQueryFieldInterface[] = visibleColumns
        .filter((column) => !skipFields.includes(column))
        .map((column) => ({
            field: column,
            label: t("label." + column),
        }));

    const exportQuery: ExportExcelQueryInterface = {
        sorting: query.sorting,
        filters: query.filters,
        fields,
        filename,
        sheetName,
    };

    const resolvedRequestConfig: undefined | AxiosRequestConfig = resolveEndpoint(endpoint);
    if (typeof resolvedRequestConfig === "undefined") {
        throw new Error("ExportExcel component: Resolved requestConfig is undefined");
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
                label: "action.exportExcel",
                color: "primary",
                variant: "contained",
                ...props,
            }}
        />
    );
};

export default ExportExcel;
export { ExportExcelProps, ExportExcelInterface };
