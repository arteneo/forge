import React from "react";
import ButtonDialogBatchFormMultiAlertFieldset, {
    ButtonDialogBatchFormMultiAlertFieldsetProps,
} from "../../../components/Common/ButtonDialogBatchFormMultiAlertFieldset";
import { useTable } from "../../../components/Table/contexts/Table";
import Optional from "../../../definitions/Optional";

interface BatchFormMultiAlertProps extends Omit<ButtonDialogBatchFormMultiAlertFieldsetProps, "dialogProps"> {
    dialogProps: Optional<ButtonDialogBatchFormMultiAlertFieldsetProps["dialogProps"], "results">;
}

const BatchFormMultiAlert = ({ dialogProps, ...props }: BatchFormMultiAlertProps) => {
    const { results, selected, reload } = useTable();

    const selectedResults = results.filter((result) => selected.includes(result.id));

    return (
        <ButtonDialogBatchFormMultiAlertFieldset
            {...{
                disabled: selected.length === 0,
                labelVariables: {
                    count: selected.length,
                },
                dialogProps: {
                    results: selectedResults,
                    ...dialogProps,
                    formProps: {
                        ...dialogProps?.formProps,
                        onSubmitFinish: (defaultOnSubmitFinish, values, helpers, cancelled) => {
                            const internalDefaultOnSubmitFinish = () => {
                                defaultOnSubmitFinish();
                                reload();
                            };

                            if (typeof dialogProps?.formProps?.onSubmitFinish !== "undefined") {
                                dialogProps.formProps.onSubmitFinish(
                                    internalDefaultOnSubmitFinish,
                                    values,
                                    helpers,
                                    cancelled
                                );
                                return;
                            }

                            internalDefaultOnSubmitFinish();
                        },
                    },
                },
                ...props,
            }}
        />
    );
};

export default BatchFormMultiAlert;
export { BatchFormMultiAlertProps };
