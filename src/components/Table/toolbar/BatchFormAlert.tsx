import React from "react";
import ButtonDialogBatchFormAlertFieldset, {
    ButtonDialogBatchFormAlertFieldsetProps,
} from "../../../components/Common/ButtonDialogBatchFormAlertFieldset";
import { useTable } from "../../../components/Table/contexts/Table";
import Optional from "../../../definitions/Optional";

interface BatchFormAlertProps extends Omit<ButtonDialogBatchFormAlertFieldsetProps, "dialogProps"> {
    dialogProps: Optional<ButtonDialogBatchFormAlertFieldsetProps["dialogProps"], "results">;
}

const BatchFormAlert = ({ dialogProps, ...props }: BatchFormAlertProps) => {
    const { results, batchQuery, selected, reload } = useTable();

    const selectedResults = results.filter((result) => selected.includes(result.id));

    return (
        <ButtonDialogBatchFormAlertFieldset
            {...{
                disabled: selected.length === 0,
                labelVariables: {
                    count: selected.length,
                },
                dialogProps: {
                    results: selectedResults,
                    ...dialogProps,
                    formProps: {
                        changeSubmitValues: (values) => {
                            const _values = {
                                ...batchQuery,
                                ...values,
                            };

                            if (typeof dialogProps?.formProps?.changeSubmitValues !== "undefined") {
                                return dialogProps?.formProps?.changeSubmitValues(_values);
                            }

                            return _values;
                        },
                        onSubmitSuccess: (defaultOnSubmitSuccess, helpers, response) => {
                            const internalDefaultOnSubmitSuccess = () => {
                                defaultOnSubmitSuccess();
                                reload();
                            };

                            if (typeof dialogProps?.formProps?.onSubmitSuccess !== "undefined") {
                                dialogProps.formProps.onSubmitSuccess(
                                    internalDefaultOnSubmitSuccess,
                                    helpers,
                                    response
                                );
                                return;
                            }

                            internalDefaultOnSubmitSuccess();
                        },
                        ...dialogProps?.formProps,
                    },
                },
                ...props,
            }}
        />
    );
};

export default BatchFormAlert;
export { BatchFormAlertProps };
