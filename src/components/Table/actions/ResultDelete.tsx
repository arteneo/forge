import React from "react";
import _ from "lodash";
import ResultButtonDialogAlertConfirm, {
    ResultButtonDialogAlertConfirmProps,
} from "../../../components/Table/actions/ResultButtonDialogAlertConfirm";
import { mergeEndpointCustomizer } from "../../../utilities/merge";
import Optional from "../../../definitions/Optional";

type ResultDeleteProps = Optional<ResultButtonDialogAlertConfirmProps, "label">;

const ResultDelete = ({ result, dialogProps, ...props }: ResultDeleteProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultDelete component: Missing required result prop");
    }

    const internalDialogProps = {
        title: "resultDelete.dialog.title",
        label: "resultDelete.dialog.label",
        labelVariables: { representation: result.representation },
        alertProps: {
            severity: "error",
        },
        confirmProps: {
            label: "action.delete",
            color: "error",
            variant: "contained",
            snackbarLabel: "resultDelete.snackbar.success",
            snackbarLabelVariables: {
                result: result.representation,
            },
            endpoint: {
                method: "delete",
            },
        },
    };

    return (
        <ResultButtonDialogAlertConfirm
            {...{
                result,
                label: "action.delete",
                color: "error",
                variant: "contained",
                deny: result?.deny,
                denyKey: "delete",
                dialogProps: (result) =>
                    _.mergeWith(internalDialogProps, dialogProps(result), mergeEndpointCustomizer()),
                ...props,
            }}
        />
    );
};

export default ResultDelete;
export { ResultDeleteProps };
