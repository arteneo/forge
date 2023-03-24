import React from "react";
import { getIn } from "formik";
import _ from "lodash";
import ButtonDialogFormFieldset, {
    ButtonDialogFormFieldsetProps,
} from "../../../components/Common/ButtonDialogFormFieldset";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { useTable } from "../../../components/Table/contexts/Table";

interface ResultButtonDialogFormFieldsetSpecificProps {
    disableOnSubmitSuccessReload?: boolean;
    dialogProps: (result: ResultInterface) => ButtonDialogFormFieldsetProps["dialogProps"];
}

type ResultButtonDialogFormFieldsetProps = ResultButtonDialogFormFieldsetSpecificProps &
    Omit<ButtonDialogFormFieldsetProps, "dialogProps"> &
    ColumnActionPathInterface;

const ResultButtonDialogFormFieldset = ({
    result,
    path,
    disableOnSubmitSuccessReload,
    dialogProps,
    ...props
}: ResultButtonDialogFormFieldsetProps) => {
    const { reload } = useTable();

    if (typeof result === "undefined") {
        throw new Error("ResultButtonDialogFormFieldset component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;

    const resolvedDialogProps = dialogProps(value);
    // We need to reference something else then onSubmitSuccess in resolvedDialogProps to avoid recurrence (onSubmitSuccess will be overridden)
    const resolvedOnSubmitSuccess = resolvedDialogProps?.formProps?.onSubmitSuccess;

    const onSubmitSuccess: ButtonDialogFormFieldsetProps["dialogProps"]["formProps"]["onSubmitSuccess"] = (
        defaultOnSubmitSuccess,
        values,
        helpers,
        response,
        onClose
    ) => {
        const internalDefaultOnSuccess = () => {
            defaultOnSubmitSuccess();

            if (!disableOnSubmitSuccessReload) {
                reload();
            }
        };

        if (typeof resolvedOnSubmitSuccess !== "undefined") {
            resolvedOnSubmitSuccess(internalDefaultOnSuccess, values, helpers, response, onClose);
            return;
        }

        internalDefaultOnSuccess();
    };

    return (
        <ButtonDialogFormFieldset
            {...{
                deny: result?.deny,
                // Override formProps.onSubmitSuccess with internal one to include reload logic in defaultOnSubmitSuccess
                dialogProps: _.merge(resolvedDialogProps, {
                    formProps: {
                        onSubmitSuccess,
                    },
                }) as ButtonDialogFormFieldsetProps["dialogProps"],
                ...props,
            }}
        />
    );
};

export default ResultButtonDialogFormFieldset;
export { ResultButtonDialogFormFieldsetProps, ResultButtonDialogFormFieldsetSpecificProps };
