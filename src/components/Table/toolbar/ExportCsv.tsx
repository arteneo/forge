import React from "react";
import { useTranslation } from "react-i18next";
import { AxiosRequestConfig } from "axios";
import ExportQueryInterface from "../../../components/Table/definitions/ExportQueryInterface";
import { useTable } from "../../../components/Table/contexts/Table";
import ButtonDownload, { ButtonDownloadProps } from "../../../components/Common/ButtonDownload";
import Optional from "../../../definitions/Optional";

interface ExportCsvInterface {
    endpoint?: string;
    fileName?: string;
    sheetName?: string;
    changeQuery?: (query: ExportQueryInterface) => ExportQueryInterface;
    removeFields?: string[];
}

type ExportCsvProps = Optional<ExportCsvInterface & ButtonDownloadProps, "endpoint">;

const ExportCsv = ({
    endpoint,
    fileName,
    sheetName,
    changeQuery,
    removeFields = ["actions"],
    ...props
}: ExportCsvProps) => {
    const { t } = useTranslation();
    const { custom, visibleColumns, query } = useTable();

    if (typeof endpoint === "undefined" && typeof custom?.endpoints?.exportCsv === "undefined") {
        throw new Error(
            "ExportCsv component: Missing required endpoint prop or endpoints.exportCsv definition in custom variable used by Table context"
        );
    }

    if (typeof fileName === "undefined" && typeof custom?.export?.csvFileName === "undefined") {
        throw new Error(
            "ExportCsv component: Missing required fileName prop or export.csvFileName definition in custom variable used by Table context"
        );
    }

    if (typeof sheetName === "undefined" && typeof custom?.export?.csvSheetName === "undefined") {
        throw new Error(
            "ExportCsv component: Missing required sheetName prop or export.csvSheetName definition in custom variable used by Table context"
        );
    }

    const resolvedEndpoint = endpoint ? endpoint : custom.endpoints.exportCsv;
    const resolvedFileName = fileName ? fileName : custom.export.csvFileName;
    const resolvedSheetName = sheetName ? sheetName : custom.export.csvSheetName;

    let exportQuery: ExportQueryInterface = {
        sorting: query.sorting,
        filters: query.filters,
        fields: [],
        fileName: resolvedFileName,
        sheetName: resolvedSheetName,
    };

    Object.keys(visibleColumns).map((field) => {
        exportQuery.fields.push({
            field,
            label: t("label." + field),
        });
    });

    if (changeQuery) {
        exportQuery = changeQuery(exportQuery);
    } else if (removeFields) {
        exportQuery.fields = exportQuery.fields.filter((field) => !removeFields.includes(field.field));
    }

    const requestConfig: AxiosRequestConfig = {
        method: "post",
        url: resolvedEndpoint,
        data: exportQuery,
        responseType: "blob",
    };

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
