import React from "react";
import { getIn } from "formik";
import _ from "lodash";
import ButtonDialogAlertConfirm, {
    ButtonDialogAlertConfirmProps,
} from "../../../components/Common/ButtonDialogAlertConfirm";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { useTable } from "../../../components/Table/contexts/Table";

interface ResultButtonDialogAlertConfirmSpecificProps {
    disableOnSuccessReload?: boolean;
    dialogProps: (result: ResultInterface) => ButtonDialogAlertConfirmProps["dialogProps"];
}

type ResultButtonDialogAlertConfirmProps = ResultButtonDialogAlertConfirmSpecificProps &
    Omit<ButtonDialogAlertConfirmProps, "dialogProps"> &
    ColumnActionPathInterface;

const ResultButtonDialogAlertConfirm = ({
    disableOnSuccessReload,
    dialogProps,
    result,
    path,
    ...props
}: ResultButtonDialogAlertConfirmProps) => {
    const { reload } = useTable();

    if (typeof result === "undefined") {
        throw new Error("ResultButtonDialogAlertConfirm component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;

    const resolvedDialogProps = dialogProps(value);
    // We need to reference something else then onSuccess in resolvedDialogProps to avoid recurrence (onSuccess will be overridden)
    const resolvedOnSuccess = resolvedDialogProps?.confirmProps?.onSuccess;

    const onSuccess: ButtonDialogAlertConfirmProps["dialogProps"]["confirmProps"]["onSuccess"] = (
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
        <ButtonDialogAlertConfirm
            {...{
                deny: result?.deny,
                // Override confirmProps.onSuccess with internal one to include reload logic in defaultOnSuccess
                dialogProps: _.mergeWith(resolvedDialogProps, {
                    confirmProps: {
                        onSuccess,
                    },
                }) as ButtonDialogAlertConfirmProps["dialogProps"],
                ...props,
            }}
        />
    );
};

export default ResultButtonDialogAlertConfirm;
export { ResultButtonDialogAlertConfirmProps, ResultButtonDialogAlertConfirmSpecificProps };
