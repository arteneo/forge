import React from "react";
import { getIn } from "formik";
import _ from "lodash";
import ButtonDialogForm, { ButtonDialogFormProps } from "../../../components/Common/ButtonDialogForm";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { useTable } from "../../../components/Table/contexts/Table";

interface ResultButtonDialogFormSpecificProps {
    disableOnSubmitSuccessReload?: boolean;
    dialogProps: (result: ResultInterface) => ButtonDialogFormProps["dialogProps"];
}

type ResultButtonDialogFormProps = ResultButtonDialogFormSpecificProps &
    Omit<ButtonDialogFormProps, "dialogProps"> &
    ColumnActionPathInterface;

const ResultButtonDialogForm = ({
    result,
    path,
    disableOnSubmitSuccessReload,
    dialogProps,
    ...props
}: ResultButtonDialogFormProps) => {
    const { reload } = useTable();

    if (typeof result === "undefined") {
        throw new Error("ResultButtonDialogForm component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;

    const resolvedDialogProps = dialogProps(value);
    // We need to reference something else then onSubmitSuccess in resolvedDialogProps to avoid recurrence (onSubmitSuccess will be overridden)
    const resolvedOnSubmitSuccess = resolvedDialogProps?.formProps?.onSubmitSuccess;

    const onSubmitSuccess: ButtonDialogFormProps["dialogProps"]["formProps"]["onSubmitSuccess"] = (
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
        <ButtonDialogForm
            {...{
                deny: result?.deny,
                // Override formProps.onSubmitSuccess with internal one to include reload logic in defaultOnSubmitSuccess
                dialogProps: _.merge(resolvedDialogProps, {
                    formProps: {
                        onSubmitSuccess,
                    },
                }) as ButtonDialogFormProps["dialogProps"],
                ...props,
            }}
        />
    );
};

export default ResultButtonDialogForm;
export { ResultButtonDialogFormProps, ResultButtonDialogFormSpecificProps };
