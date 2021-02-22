import React from "react";
import { useTranslation } from "react-i18next";
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";
import Wrapper from "@arteneo/forge/components/Table/components/Wrapper";
import ExportQueryInterface from "@arteneo/forge/components/Table/definitions/ExportQueryInterface";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import axios from "axios";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import Button, { Props as ButtonProps } from "@arteneo/forge/components/Common/Button";

interface Props extends WrapperInterface {
    changeQuery?: (query: ExportQueryInterface) => ExportQueryInterface;
    buttonProps?: ButtonProps;
}

const ExportCsv: React.FC<Props> = ({
    buttonProps = {
        variant: "contained",
        color: "primary",
    },
    changeQuery,
    wrapperComponent,
    wrapperComponentProps,
}: Props) => {
    const { t } = useTranslation();
    const { custom, row, query } = useTable();
    const { showLoader, hideLoader } = useLoader();
    const handleCatch = useHandleCatch();

    if (typeof custom?.endpoints?.exportCsv === "undefined") {
        throw new Error(
            "ExportCsv component: Missing required endpoints.exportCsv definition in custom variable used by Table context"
        );
    }

    if (typeof custom?.export?.csvFileName === "undefined") {
        throw new Error(
            "ExportCsv component: Missing required export.csvFileName definition in custom variable used by Table context"
        );
    }

    if (typeof custom?.export?.csvSheetName === "undefined") {
        throw new Error(
            "ExportCsv component: Missing required export.csvSheetName definition in custom variable used by Table context"
        );
    }

    const onClick = () => {
        showLoader();

        let exportQuery: ExportQueryInterface = {
            sorting: query.sorting,
            filters: query.filters,
            fields: [],
            fileName: custom.export.csvFileName,
            sheetName: custom.export.csvSheetName,
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

        axios
            .post(custom.endpoints.exportCsv, exportQuery, { responseType: "blob" })
            .then((response) => {
                hideLoader();

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", response.headers["content-type-filename"]);
                link.setAttribute("target", "_blank");
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => handleCatch(error));
    };

    const button = (
        // eslint-disable-next-line
        // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
        <Button onClick={onClick} {...buttonProps}>
            {t("action.exportCsv")}
        </Button>
    );

    return (
        <Wrapper
            {...{
                wrapperComponent,
                wrapperComponentProps,
            }}
        >
            {button}
        </Wrapper>
    );
};

export default ExportCsv;
