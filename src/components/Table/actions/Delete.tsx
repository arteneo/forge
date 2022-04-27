import React from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "@mui/material";
import { useTable } from "../../../components/Table/contexts/Table";
import ResultButtonEndpointDialogConfirm, {
    ResultButtonEndpointDialogConfirmProps,
    RenderDialogResultConfirmParams,
} from "../../../components/Table/actions/ResultButtonEndpointDialogConfirm";
import { Optional } from "../../../utilities/TypescriptOperators";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { resolveAnyOrFunction } from "../../../utilities/resolve";
import DialogConfirm from "../../../components/Common/DialogConfirm";

type DeleteProps = Optional<ResultButtonEndpointDialogConfirmProps, "endpoint">;

const Delete = ({ result, endpoint, renderDialog, ...props }: DeleteProps) => {
    const { t } = useTranslation();
    const { custom } = useTable();

    if (typeof result === "undefined") {
        throw new Error("Delete component: Missing required result prop");
    }

    if (typeof endpoint === "undefined" && typeof custom?.endpoints?.delete === "undefined") {
        throw new Error(
            "Delete component: Missing required endpoint prop or endpoints.delete definition in custom variable used by Table context"
        );
    }

    const defaultRenderDialog = (params: RenderDialogResultConfirmParams) => (
        <DialogConfirm
            {...{
                buttonConfirmProps: {
                    label: "action.delete",
                    color: "error",
                    variant: "contained",
                },
                children: (
                    <Alert severity="error">{t("result.delete", { representation: result.representation })}</Alert>
                ),
                ...params,
            }}
        />
    );

    return (
        <ResultButtonEndpointDialogConfirm
            {...{
                // eslint-disable-next-line
                endpoint: (value: any, result: ResultInterface, path?: string) => ({
                    method: "delete",
                    url: endpoint
                        ? resolveAnyOrFunction(endpoint, value, result, path)
                        : custom.endpoints.delete(value),
                }),
                result,
                label: "action.delete",
                denyKey: "delete",
                color: "error",
                variant: "contained",
                snackbarLabel: "snackbar.delete.success",
                snackbarLabelVariables: {
                    result: result.representation,
                },
                renderDialog: renderDialog ?? defaultRenderDialog,
                ...props,
            }}
        />
    );
};

export default Delete;
export { DeleteProps };
