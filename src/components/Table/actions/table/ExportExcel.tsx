import React from "react";
import { useTranslation } from "react-i18next";
import WrapperInterface from "forge-react/definitions/WrapperInterface";
import Wrapper from "forge-react/components/Table/components/Wrapper";
import ExportQueryInterface from "forge-react/components/Table/definitions/ExportQueryInterface";
import { useTable } from "forge-react/components/Table/contexts/Table";
import axios from "axios";
import { useHandleCatch } from "forge-react/contexts/HandleCatch";
import { useLoader } from "forge-react/contexts/Loader";
import Button, { Props as ButtonProps } from "forge-react/components/Common/Button";

interface Props extends WrapperInterface {
    changeQuery?: (query: ExportQueryInterface) => ExportQueryInterface;
    buttonProps?: ButtonProps;
}

const ExportExcel: React.FC<Props> = ({
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

    if (typeof custom?.endpoints?.exportExcel === "undefined") {
        throw new Error(
            "ExportExcel component: Missing required endpoints.exportExcel definition in custom variable used by Table context"
        );
    }

    if (typeof custom?.export?.excelFileName === "undefined") {
        throw new Error(
            "ExportExcel component: Missing required export.excelFileName definition in custom variable used by Table context"
        );
    }

    if (typeof custom?.export?.excelSheetName === "undefined") {
        throw new Error(
            "ExportExcel component: Missing required export.excelSheetName definition in custom variable used by Table context"
        );
    }

    const onClick = () => {
        showLoader();

        let exportQuery: ExportQueryInterface = {
            sorting: query.sorting,
            filters: query.filters,
            fields: [],
            fileName: custom.export.excelFileName,
            sheetName: custom.export.excelSheetName,
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
            .post(custom.endpoints.exportExcel, exportQuery, { responseType: "blob" })
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
            {t("action.exportExcel")}
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

export default ExportExcel;
