import React from "react";
import Optional from "../../definitions/Optional";
import DialogBatchAlert, { DialogBatchAlertProps } from "../../components/Dialog/DialogBatchAlert";
import DialogBatchButtonEndpoint, {
    DialogBatchButtonEndpointProps,
} from "../../components/Dialog/DialogBatchButtonEndpoint";

interface DialogBatchAlertConfirmProps extends Optional<DialogBatchAlertProps, "title"> {
    confirmProps: DialogBatchButtonEndpointProps;
}

const DialogBatchAlertConfirm = ({ confirmProps, ...props }: DialogBatchAlertConfirmProps) => {
    return (
        <DialogBatchAlert
            {...{
                title: "dialogConfirm.title",
                actions: <DialogBatchButtonEndpoint {...confirmProps} />,
                ...props,
            }}
        />
    );
};

export default DialogBatchAlertConfirm;
export { DialogBatchAlertConfirmProps };
