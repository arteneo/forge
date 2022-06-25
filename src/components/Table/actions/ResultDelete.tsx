import React from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "@mui/material";
import ResultButtonEndpointDialogConfirm, {
    ResultButtonEndpointDialogConfirmProps,
    ResultButtonEndpointDialogConfirmRenderDialogParams,
} from "../../../components/Table/actions/ResultButtonEndpointDialogConfirm";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { resolveAnyOrFunction } from "../../../utilities/resolve";
import DialogConfirm from "../../../components/Common/DialogConfirm";

type ResultDeleteProps = ResultButtonEndpointDialogConfirmProps;

const ResultDelete = ({ result, endpoint, renderDialog, ...props }: ResultDeleteProps) => {
    const { t } = useTranslation();

    if (typeof result === "undefined") {
        throw new Error("ResultDelete component: Missing required result prop");
    }

    const defaultRenderDialog = (params: ResultButtonEndpointDialogConfirmRenderDialogParams) => (
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
                    url: resolveAnyOrFunction(endpoint, value, result, path),
                }),
                result,
                denyKey: "delete",
                label: "action.delete",
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

export default ResultDelete;
export { ResultDeleteProps };
