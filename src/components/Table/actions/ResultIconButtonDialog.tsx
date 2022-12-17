import React from "react";
import { getIn } from "formik";
import IconButtonDialog, { IconButtonDialogProps } from "../../../components/Common/IconButtonDialog";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";

interface ResultIconButtonDialogSpecificProps {
    dialogProps: (result: ResultInterface) => IconButtonDialogProps["dialogProps"];
}

type ResultIconButtonDialogProps = Omit<IconButtonDialogProps, "dialogProps"> &
    ResultIconButtonDialogSpecificProps &
    ColumnActionPathInterface;

const ResultIconButtonDialog = ({ result, path, dialogProps, ...props }: ResultIconButtonDialogProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultIconButtonDialog component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;

    return (
        <IconButtonDialog
            {...{
                deny: result?.deny,
                dialogProps: dialogProps(value),
                ...props,
            }}
        />
    );
};

export default ResultIconButtonDialog;
export { ResultIconButtonDialogProps, ResultIconButtonDialogSpecificProps };
