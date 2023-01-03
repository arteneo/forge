import React from "react";
import _ from "lodash";
import ButtonDialogBatchAlertConfirm, {
    ButtonDialogBatchAlertConfirmProps,
} from "../../../components/Common/ButtonDialogBatchAlertConfirm";
import { useTable } from "../../../components/Table/contexts/Table";
import { mergeEndpointCustomizer } from "../../../utilities/merge";
import Optional from "../../../definitions/Optional";

interface BatchAlertConfirmProps extends Omit<ButtonDialogBatchAlertConfirmProps, "dialogProps"> {
    dialogProps: Optional<ButtonDialogBatchAlertConfirmProps["dialogProps"], "results">;
}

const BatchAlertConfirm = ({ dialogProps, ...props }: BatchAlertConfirmProps) => {
    const { results, batchQuery, selected } = useTable();

    const selectedResults = results.filter((result) => selected.includes(result.id));

    return (
        <ButtonDialogBatchAlertConfirm
            {...{
                disabled: selected.length === 0,
                labelVariables: {
                    count: selected.length,
                },
                dialogProps: _.mergeWith(
                    {
                        results: selectedResults,
                        confirmProps: {
                            endpoint: {
                                data: batchQuery,
                            },
                        },
                    },
                    dialogProps,
                    mergeEndpointCustomizer()
                ),
                ...props,
            }}
        />
    );
};

export default BatchAlertConfirm;
export { BatchAlertConfirmProps };
