import React from "react";
import { useTranslation } from "react-i18next";
import { AxiosRequestConfig } from "axios";
import ExportExcelQueryInterface from "../../../components/Table/definitions/ExportExcelQueryInterface";
import ExportQueryFieldInterface from "../../../components/Table/definitions/ExportQueryFieldInterface";
import ExportQueryFieldTranslatedInterface from "../../../components/Table/definitions/ExportQueryFieldTranslatedInterface";
import { useTable } from "../../../components/Table/contexts/Table";
import ButtonDownload, { ButtonDownloadProps } from "../../../components/Common/ButtonDownload";
import Optional from "../../../definitions/Optional";
import { resolveEndpoint } from "../../../utilities/resolve";

interface ExportExcelInterface {
    filename: string;
    sheetName: string;
    modifyFields?: (fields: ExportQueryFieldInterface[]) => ExportQueryFieldInterface[];
    modifyQuery?: (query: ExportExcelQueryInterface) => ExportExcelQueryInterface;
    skipFields?: string[];
}

type ExportExcelProps = Optional<ExportExcelInterface & ButtonDownloadProps, "endpoint">;

const ExportExcel = ({
    endpoint,
    filename,
    sheetName,
    modifyFields,
    skipFields = ["actions"],
    modifyQuery,
    ...props
}: ExportExcelProps) => {
    const { t } = useTranslation();
    const { visibleColumns, query } = useTable();

    let fields: ExportQueryFieldInterface[] = visibleColumns
        .filter((column) => !skipFields.includes(column))
        .map((field) => ({
            field,
            label: "label." + field,
        }));

    if (typeof modifyFields !== "undefined") {
        fields = modifyFields(fields);
    }

    const translatedFields: ExportQueryFieldTranslatedInterface[] = fields.map((field) => ({
        field: field.field,
        label: field.disableTranslateLabel ? field.label : t(field.label),
    }));

    const exportQuery: ExportExcelQueryInterface = {
        sorting: query.sorting,
        filters: query.filters,
        fields: translatedFields,
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
