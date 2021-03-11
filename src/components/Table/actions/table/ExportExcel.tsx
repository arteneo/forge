import React from "react";
import { useTranslation } from "react-i18next";
import ExportQueryInterface from "@arteneo/forge/components/Table/definitions/ExportQueryInterface";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import ButtonDownload, { ButtonDownloadProps } from "@arteneo/forge/components/Common/ButtonDownload";
import { AxiosRequestConfig } from "axios";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";

interface ExportExcelInterface {
    // eslint-disable-next-line
    endpoint?: string;
    fileName?: string;
    sheetName?: string;
    changeQuery?: (query: ExportQueryInterface) => ExportQueryInterface;
}

type ExportExcelProps = Optional<ExportExcelInterface & ButtonDownloadProps, "requestConfig">;

const ExportExcel = ({ endpoint, fileName, sheetName, changeQuery, ...props }: ExportExcelProps) => {
    const { t } = useTranslation();
    const { custom, row, query } = useTable();

    if (typeof endpoint === "undefined" && typeof custom?.endpoints?.exportExcel === "undefined") {
        throw new Error(
            "ExportExcel component: Missing required endpoint prop or endpoints.exportExcel definition in custom variable used by Table context"
        );
    }

    if (typeof fileName === "undefined" && typeof custom?.export?.excelFileName === "undefined") {
        throw new Error(
            "ExportExcel component: Missing required fileName prop or export.excelFileName definition in custom variable used by Table context"
        );
    }

    if (typeof sheetName === "undefined" && typeof custom?.export?.excelSheetName === "undefined") {
        throw new Error(
            "ExportExcel component: Missing required sheetName prop or export.excelSheetName definition in custom variable used by Table context"
        );
    }

    const resolvedEndpoint = endpoint ? endpoint : custom.endpoints.exportExcel;
    const resolvedFileName = fileName ? fileName : custom.export.excelFileName;
    const resolvedSheetName = sheetName ? sheetName : custom.export.excelSheetName;

    let exportQuery: ExportQueryInterface = {
        sorting: query.sorting,
        filters: query.filters,
        fields: [],
        fileName: resolvedFileName,
        sheetName: resolvedSheetName,
    };

    Object.keys(row).map((field) => {
        exportQuery.fields.push({
            field,
            label: t("label." + field),
        });
    });

    if (changeQuery) {
        exportQuery = changeQuery(exportQuery);
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
                requestConfig,
                label: "action.exportExcel",
                color: "primary",
                variant: "contained",
                ...props,
            }}
        />
    );
};

export default ExportExcel;
export { ExportExcelProps };
