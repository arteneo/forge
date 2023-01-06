import React from "react";
import ButtonDialogBatchFormMultiFieldset, {
    ButtonDialogBatchFormMultiFieldsetProps,
} from "../../../components/Common/ButtonDialogBatchFormMultiFieldset";
import { useTable } from "../../../components/Table/contexts/Table";
import Optional from "../../../definitions/Optional";

interface BatchFormMultiProps extends Omit<ButtonDialogBatchFormMultiFieldsetProps, "dialogProps"> {
    dialogProps: Optional<ButtonDialogBatchFormMultiFieldsetProps["dialogProps"], "results">;
}

const BatchFormMulti = ({ dialogProps, ...props }: BatchFormMultiProps) => {
    const { results, selected, reload } = useTable();

    const selectedResults = results.filter((result) => selected.includes(result.id));

    return (
        <ButtonDialogBatchFormMultiFieldset
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

export default BatchFormMulti;
export { BatchFormMultiProps };
