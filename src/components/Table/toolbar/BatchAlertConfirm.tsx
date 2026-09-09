import _ from "lodash";

import {
    ButtonDialogBatchAlertConfirm,
    type ButtonDialogBatchAlertConfirmProps,
} from "../../../components/Common/ButtonDialogBatchAlertConfirm";
import { useTable } from "../../../components/Table/contexts/Table";
import { Optional } from "../../../definitions/Optional";
import { mergeEndpointCustomizer } from "../../../utilities/merge";

interface BatchAlertConfirmProps extends Omit<ButtonDialogBatchAlertConfirmProps, "dialogProps"> {
    dialogProps: Optional<ButtonDialogBatchAlertConfirmProps["dialogProps"], "results">;
}

const BatchAlertConfirm = ({ dialogProps, ...props }: BatchAlertConfirmProps) => {
    const { results, batchQuery, selected, reload } = useTable();

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
                    {
                        confirmProps: {
                            onSuccess: (defaultOnSuccess, response, setLoading) => {
                                const internalDefaultOnSuccess = () => {
                                    defaultOnSuccess();
                                    reload();
                                };

                                if (typeof dialogProps?.confirmProps?.onSuccess !== "undefined") {
                                    dialogProps.confirmProps.onSuccess(internalDefaultOnSuccess, response, setLoading);
                                    return;
                                }

                                internalDefaultOnSuccess();
                            },
                        },
                    } as BatchAlertConfirmProps["dialogProps"],
                    mergeEndpointCustomizer(),
                ),
                ...props,
            }}
        />
    );
};

export { BatchAlertConfirm, type BatchAlertConfirmProps };
