import React from "react";
import ButtonDialog, {
    ButtonDialogProps,
    ButtonDialogRenderDialogParams,
} from "../../../components/Common/ButtonDialog";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";

interface ResultButtonDialogRenderDialogParams extends ButtonDialogRenderDialogParams {
    result: ResultInterface;
}

interface ResultButtonDialogSpecificProps {
    renderDialog: (params: ResultButtonDialogRenderDialogParams) => React.ReactNode;
}

type ResultButtonDialogProps = Omit<ButtonDialogProps, "renderDialog"> &
    ResultButtonDialogSpecificProps &
    ColumnActionPathInterface;

const ResultButtonDialog = ({ result, renderDialog, ...props }: ResultButtonDialogProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultButtonDialog component: Missing required result prop");
    }

    return (
        <ButtonDialog
            {...{
                deny: result?.deny,
                renderDialog: (params) => renderDialog({ ...params, result }),
                ...props,
            }}
        />
    );
};

export default ResultButtonDialog;
export { ResultButtonDialogProps, ResultButtonDialogSpecificProps, ResultButtonDialogRenderDialogParams };
