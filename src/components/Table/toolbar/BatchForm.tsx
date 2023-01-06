import React from "react";
import ButtonDialogBatchFormFieldset, {
    ButtonDialogBatchFormFieldsetProps,
} from "../../../components/Common/ButtonDialogBatchFormFieldset";
import { useTable } from "../../../components/Table/contexts/Table";
import Optional from "../../../definitions/Optional";

interface BatchFormProps extends Omit<ButtonDialogBatchFormFieldsetProps, "dialogProps"> {
    dialogProps: Optional<ButtonDialogBatchFormFieldsetProps["dialogProps"], "results">;
}

const BatchForm = ({ dialogProps, ...props }: BatchFormProps) => {
    const { results, batchQuery, selected, reload } = useTable();

    const selectedResults = results.filter((result) => selected.includes(result.id));

    return (
        <ButtonDialogBatchFormFieldset
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
                    },
                },
                ...props,
            }}
        />
    );
};

export default BatchForm;
export { BatchFormProps };
