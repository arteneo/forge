import React from "react";
import _ from "lodash";
import ButtonDialogBatchConfirm, {
    ButtonDialogBatchConfirmProps,
} from "../../../components/Common/ButtonDialogBatchConfirm";
import { useTable } from "../../../components/Table/contexts/Table";
import { mergeEndpointCustomizer } from "../../../utilities/merge";
import Optional from "../../../definitions/Optional";

interface BatchConfirmProps extends Omit<ButtonDialogBatchConfirmProps, "dialogProps"> {
    dialogProps: Optional<ButtonDialogBatchConfirmProps["dialogProps"], "results">;
}

const BatchConfirm = ({ dialogProps, ...props }: BatchConfirmProps) => {
    const { results, batchQuery, selected, reload } = useTable();

    const selectedResults = results.filter((result) => selected.includes(result.id));

    return (
        <ButtonDialogBatchConfirm
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
                    } as BatchConfirmProps["dialogProps"],
                    mergeEndpointCustomizer()
                ),
                ...props,
            }}
        />
    );
};

export default BatchConfirm;
export { BatchConfirmProps };
