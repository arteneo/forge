import React from "react";
import Optional from "../../definitions/Optional";
import DialogBatch, { DialogBatchProps } from "../../components/Dialog/DialogBatch";
import DialogBatchButtonMultiEndpoint, {
    DialogBatchButtonMultiEndpointProps,
} from "../../components/Dialog/DialogBatchButtonMultiEndpoint";

interface DialogBatchConfirmMultiProps extends Optional<DialogBatchProps, "title"> {
    confirmProps: DialogBatchButtonMultiEndpointProps;
}

const DialogBatchConfirmMulti = ({ confirmProps, ...props }: DialogBatchConfirmMultiProps) => {
    return (
        <DialogBatch
            {...{
                title: "dialogConfirm.title",
                actions: <DialogBatchButtonMultiEndpoint {...confirmProps} />,
                ...props,
            }}
        />
    );
};

export default DialogBatchConfirmMulti;
export { DialogBatchConfirmMultiProps };
