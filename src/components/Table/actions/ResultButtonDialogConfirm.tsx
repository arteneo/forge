import React from "react";
import { getIn } from "formik";
import _ from "lodash";
import ButtonDialogConfirm, { ButtonDialogConfirmProps } from "../../../components/Common/ButtonDialogConfirm";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { useTable } from "../../../components/Table/contexts/Table";

interface ResultButtonDialogConfirmSpecificProps {
    disableOnSuccessReload?: boolean;
    dialogProps: (result: ResultInterface) => ButtonDialogConfirmProps["dialogProps"];
}

type ResultButtonDialogConfirmProps = ResultButtonDialogConfirmSpecificProps &
    Omit<ButtonDialogConfirmProps, "dialogProps"> &
    ColumnActionPathInterface;

const ResultButtonDialogConfirm = ({
    disableOnSuccessReload,
    dialogProps,
    result,
    path,
    ...props
}: ResultButtonDialogConfirmProps) => {
    const { reload } = useTable();

    if (typeof result === "undefined") {
        throw new Error("ResultButtonDialogConfirm component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;

    const resolvedDialogProps = dialogProps(value);
    // We need to reference something else then onSuccess in resolvedDialogProps to avoid recurrence (onSuccess will be overridden)
    const resolvedOnSuccess = resolvedDialogProps?.confirmProps?.onSuccess;

    const onSuccess: ButtonDialogConfirmProps["dialogProps"]["confirmProps"]["onSuccess"] = (
        defaultOnSuccess,
        response,
        setLoading
    ) => {
        const internalDefaultOnSuccess = () => {
            defaultOnSuccess();

            if (!disableOnSuccessReload) {
                reload();
            }
        };

        if (typeof resolvedOnSuccess !== "undefined") {
            resolvedOnSuccess(internalDefaultOnSuccess, response, setLoading);
            return;
        }

        internalDefaultOnSuccess();
    };

    return (
        <ButtonDialogConfirm
            {...{
                deny: result?.deny,
                // Override confirmProps.onSuccess with internal one to include reload logic in defaultOnSuccess
                dialogProps: _.merge(resolvedDialogProps, {
                    confirmProps: {
                        onSuccess,
                    },
                }) as ButtonDialogConfirmProps["dialogProps"],
                ...props,
            }}
        />
    );
};

export default ResultButtonDialogConfirm;
export { ResultButtonDialogConfirmProps, ResultButtonDialogConfirmSpecificProps };
