import React from "react";
import { useTranslation } from "react-i18next";
import { AxiosRequestConfig } from "axios";
import ExportCsvQueryInterface from "../../../components/Table/definitions/ExportCsvQueryInterface";
import ExportQueryFieldInterface from "../../../components/Table/definitions/ExportQueryFieldInterface";
import ExportQueryFieldTranslatedInterface from "../../../components/Table/definitions/ExportQueryFieldTranslatedInterface";
import { useTable } from "../../../components/Table/contexts/Table";
import ButtonDownload, { ButtonDownloadProps } from "../../../components/Common/ButtonDownload";
import Optional from "../../../definitions/Optional";
import { resolveEndpoint } from "../../../utilities/resolve";

interface ExportCsvInterface {
    filename: string;
    modifyFields?: (fields: ExportQueryFieldInterface[]) => ExportQueryFieldInterface[];
    modifyQuery?: (query: ExportCsvQueryInterface) => ExportCsvQueryInterface;
    skipFields?: string[];
}

type ExportCsvProps = Optional<ExportCsvInterface & ButtonDownloadProps, "endpoint">;

const ExportCsv = ({
    endpoint,
    filename,
    modifyFields,
    skipFields = ["actions"],
    modifyQuery,
    ...props
}: ExportCsvProps) => {
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

    const exportQuery: ExportCsvQueryInterface = {
        sorting: query.sorting,
        filters: query.filters,
        fields: translatedFields,
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
