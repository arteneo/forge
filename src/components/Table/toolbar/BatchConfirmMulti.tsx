import React from "react";
import ButtonDialogBatchConfirmMulti, {
    ButtonDialogBatchConfirmMultiProps,
} from "../../../components/Common/ButtonDialogBatchConfirmMulti";
import { useTable } from "../../../components/Table/contexts/Table";
import Optional from "../../../definitions/Optional";

interface BatchConfirmMultiProps extends Omit<ButtonDialogBatchConfirmMultiProps, "dialogProps"> {
    dialogProps: Optional<ButtonDialogBatchConfirmMultiProps["dialogProps"], "results">;
}

const BatchConfirmMulti = ({ dialogProps, ...props }: BatchConfirmMultiProps) => {
    const { results, selected, reload } = useTable();

    const selectedResults = results.filter((result) => selected.includes(result.id));

    return (
        <ButtonDialogBatchConfirmMulti
            {...{
                disabled: selected.length === 0,
                labelVariables: {
                    count: selected.length,
                },
                dialogProps: {
                    results: selectedResults,
                    ...dialogProps,
                    confirmProps: {
                        ...dialogProps.confirmProps,
                        onFinish: (defaultOnFinish, setLoading, cancelled) => {
                            const internalDefaultOnFinish = () => {
                                defaultOnFinish();
                                reload();
                            };

                            if (typeof dialogProps?.confirmProps?.onFinish !== "undefined") {
                                dialogProps.confirmProps.onFinish(internalDefaultOnFinish, setLoading, cancelled);
                                return;
                            }

                            internalDefaultOnFinish();
                        },
                    },
                },
                ...props,
            }}
        />
    );
};

export default BatchConfirmMulti;
export { BatchConfirmMultiProps };
