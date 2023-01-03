import React from "react";
import ButtonDialogBatchAlertConfirmMulti, {
    ButtonDialogBatchAlertConfirmMultiProps,
} from "../../../components/Common/ButtonDialogBatchAlertConfirmMulti";
import { useTable } from "../../../components/Table/contexts/Table";
import Optional from "../../../definitions/Optional";

interface BatchAlertConfirmMultiProps extends Omit<ButtonDialogBatchAlertConfirmMultiProps, "dialogProps"> {
    dialogProps: Optional<ButtonDialogBatchAlertConfirmMultiProps["dialogProps"], "results">;
}

const BatchAlertConfirmMulti = ({ dialogProps, ...props }: BatchAlertConfirmMultiProps) => {
    const { results, selected } = useTable();

    const selectedResults = results.filter((result) => selected.includes(result.id));

    return (
        <ButtonDialogBatchAlertConfirmMulti
            {...{
                disabled: selected.length === 0,
                labelVariables: {
                    count: selected.length,
                },
                dialogProps: {
                    results: selectedResults,
                    ...dialogProps,
                },
                ...props,
            }}
        />
    );
};

export default BatchAlertConfirmMulti;
export { BatchAlertConfirmMultiProps };
