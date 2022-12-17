import React from "react";
import { getIn } from "formik";
import ButtonDialog, { ButtonDialogProps } from "../../../components/Common/ButtonDialog";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";

interface ResultButtonDialogSpecificProps {
    dialogProps: (result: ResultInterface) => ButtonDialogProps["dialogProps"];
}

type ResultButtonDialogProps = ResultButtonDialogSpecificProps &
    Omit<ButtonDialogProps, "dialogProps"> &
    ColumnActionPathInterface;

const ResultButtonDialog = ({ result, path, dialogProps, ...props }: ResultButtonDialogProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultButtonDialog component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;

    return (
        <ButtonDialog
            {...{
                deny: result?.deny,
                dialogProps: dialogProps(value),
                ...props,
            }}
        />
    );
};

export default ResultButtonDialog;
export { ResultButtonDialogProps, ResultButtonDialogSpecificProps };
