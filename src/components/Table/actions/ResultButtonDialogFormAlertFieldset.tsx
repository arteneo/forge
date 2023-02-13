import React from "react";
import { getIn } from "formik";
import _ from "lodash";
import ButtonDialogFormAlertFieldset, {
    ButtonDialogFormAlertFieldsetProps,
} from "../../../components/Common/ButtonDialogFormAlertFieldset";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { useTable } from "../../../components/Table/contexts/Table";

interface ResultButtonDialogFormAlertFieldsetSpecificProps {
    disableOnSubmitSuccessReload?: boolean;
    dialogProps: (result: ResultInterface) => ButtonDialogFormAlertFieldsetProps["dialogProps"];
}

type ResultButtonDialogFormAlertFieldsetProps = ResultButtonDialogFormAlertFieldsetSpecificProps &
    Omit<ButtonDialogFormAlertFieldsetProps, "dialogProps"> &
    ColumnActionPathInterface;

const ResultButtonDialogFormAlertFieldset = ({
    result,
    path,
    disableOnSubmitSuccessReload,
    dialogProps,
    ...props
}: ResultButtonDialogFormAlertFieldsetProps) => {
    const { reload } = useTable();

    if (typeof result === "undefined") {
        throw new Error("ResultButtonDialogFormAlertFieldset component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;

    const resolvedDialogProps = dialogProps(value);
    // We need to reference something else then onSubmitSuccess in resolvedDialogProps to avoid recurrence (onSubmitSuccess will be overridden)
    const resolvedOnSubmitSuccess = resolvedDialogProps?.formProps?.onSubmitSuccess;

    const onSubmitSuccess: ButtonDialogFormAlertFieldsetProps["dialogProps"]["formProps"]["onSubmitSuccess"] = (
        defaultOnSubmitSuccess,
        helpers,
        response
    ) => {
        const internalDefaultOnSuccess = () => {
            defaultOnSubmitSuccess();

            if (!disableOnSubmitSuccessReload) {
                reload();
            }
        };

        if (typeof resolvedOnSubmitSuccess !== "undefined") {
            resolvedOnSubmitSuccess(internalDefaultOnSuccess, helpers, response);
            return;
        }

        internalDefaultOnSuccess();
    };

    return (
        <ButtonDialogFormAlertFieldset
            {...{
                deny: result?.deny,
                // Override formProps.onSubmitSuccess with internal one to include reload logic in defaultOnSubmitSuccess
                dialogProps: _.merge(resolvedDialogProps, {
                    formProps: {
                        onSubmitSuccess,
                    },
                }) as ButtonDialogFormAlertFieldsetProps["dialogProps"],
                ...props,
            }}
        />
    );
};

export default ResultButtonDialogFormAlertFieldset;
export { ResultButtonDialogFormAlertFieldsetProps, ResultButtonDialogFormAlertFieldsetSpecificProps };
