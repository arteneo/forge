import React from "react";
import Optional from "../../definitions/Optional";
import DialogBatch, { DialogBatchProps } from "../../components/Dialog/DialogBatch";
import DialogButtonBatchEndpoint, {
    DialogButtonBatchEndpointProps,
} from "../../components/Dialog/DialogButtonBatchEndpoint";

interface DialogBatchConfirmProps extends Optional<DialogBatchProps, "title"> {
    confirmProps?: DialogButtonBatchEndpointProps;
}

const DialogBatchConfirm = ({ confirmProps, ...props }: DialogBatchConfirmProps) => {
    return (
        <DialogBatch
            {...{
                title: "dialogConfirm.title",
                actions: <DialogButtonBatchEndpoint {...confirmProps} />,
                ...props,
            }}
        />
    );
};

export default DialogBatchConfirm;
export { DialogBatchConfirmProps };
