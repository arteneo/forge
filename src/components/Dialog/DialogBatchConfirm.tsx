import React from "react";
import Optional from "../../definitions/Optional";
import DialogBatch, { DialogBatchProps } from "../../components/Dialog/DialogBatch";
import DialogBatchButtonEndpoint, {
    DialogBatchButtonEndpointProps,
} from "../../components/Dialog/DialogBatchButtonEndpoint";

interface DialogBatchConfirmProps extends Optional<DialogBatchProps, "title"> {
    confirmProps: DialogBatchButtonEndpointProps;
}

const DialogBatchConfirm = ({ confirmProps, ...props }: DialogBatchConfirmProps) => {
    return (
        <DialogBatch
            {...{
                title: "dialogConfirm.title",
                actions: <DialogBatchButtonEndpoint {...confirmProps} />,
                ...props,
            }}
        />
    );
};

export default DialogBatchConfirm;
export { DialogBatchConfirmProps };
