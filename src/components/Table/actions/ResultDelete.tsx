import React from "react";
import _ from "lodash";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import ButtonDialogAlertConfirm, {
    ButtonDialogAlertConfirmProps,
} from "../../../components/Common/ButtonDialogAlertConfirm";
import { mergeEndpointCustomizer } from "../../../utilities/merge";
import Optional from "../../../definitions/Optional";
import { useTable } from "../../../components/Table/contexts/Table";

type ResultDeleteDialogProps = Optional<ButtonDialogAlertConfirmProps["dialogProps"], "label">;

interface ResultDeleteProps extends Omit<ButtonDialogAlertConfirmProps, "dialogProps"> {
    result?: ResultInterface;
    dialogProps: (result: ResultInterface) => ResultDeleteDialogProps;
}

const ResultDelete = ({ result, dialogProps, ...props }: ResultDeleteProps) => {
    const { reload } = useTable();

    if (typeof result === "undefined") {
        throw new Error("ResultDelete component: Missing required result prop");
    }

    const internalDialogProps = {
        title: "resultDelete.dialog.title",
        label: "resultDelete.dialog.confirm",
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
            onSuccess: (defaultOnSuccess: () => void) => {
                defaultOnSuccess();
                reload();
            },
        },
    };

    return (
        <ButtonDialogAlertConfirm
            {...{
                label: "action.delete",
                color: "error",
                variant: "contained",
                deny: result?.deny,
                denyKey: "delete",
                dialogProps: _.mergeWith(
                    internalDialogProps,
                    dialogProps(result),
                    mergeEndpointCustomizer()
                ) as ButtonDialogAlertConfirmProps["dialogProps"],
                ...props,
            }}
        />
    );
};

export default ResultDelete;
export { ResultDeleteProps };
