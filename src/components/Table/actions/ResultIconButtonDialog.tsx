import React from "react";
import IconButtonDialog, {
    IconButtonDialogProps,
    IconButtonDialogRenderDialogParams,
} from "../../../components/Common/IconButtonDialog";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";

interface ResultIconButtonDialogRenderDialogParams extends IconButtonDialogRenderDialogParams {
    result: ResultInterface;
}

interface ResultIconButtonDialogSpecificProps {
    renderDialog: (params: ResultIconButtonDialogRenderDialogParams) => React.ReactNode;
}

type ResultIconButtonDialogProps = Omit<IconButtonDialogProps, "renderDialog"> &
    ResultIconButtonDialogSpecificProps &
    ColumnActionPathInterface;

const ResultIconButtonDialog = ({ result, columnName, renderDialog, ...props }: ResultIconButtonDialogProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("ResultIconButtonDialog component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ResultIconButtonDialog component: Missing required result prop");
    }

    return (
        <IconButtonDialog
            {...{
                deny: result?.deny,
                renderDialog: (params) => renderDialog({ ...params, result }),
                ...props,
            }}
        />
    );
};

export default ResultIconButtonDialog;
export { ResultIconButtonDialogProps, ResultIconButtonDialogSpecificProps, ResultIconButtonDialogRenderDialogParams };
