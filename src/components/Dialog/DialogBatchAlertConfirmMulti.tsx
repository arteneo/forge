import React from "react";
import Optional from "../../definitions/Optional";
import DialogBatchAlert, { DialogBatchAlertProps } from "../../components/Dialog/DialogBatchAlert";
import DialogBatchButtonMultiEndpoint, {
    DialogBatchButtonMultiEndpointProps,
} from "../../components/Dialog/DialogBatchButtonMultiEndpoint";

interface DialogBatchAlertConfirmMultiProps extends Optional<DialogBatchAlertProps, "title"> {
    confirmProps: DialogBatchButtonMultiEndpointProps;
}

const DialogBatchAlertConfirmMulti = ({ confirmProps, ...props }: DialogBatchAlertConfirmMultiProps) => {
    return (
        <DialogBatchAlert
            {...{
                title: "dialogConfirm.title",
                actions: <DialogBatchButtonMultiEndpoint {...confirmProps} />,
                ...props,
            }}
        />
    );
};

export default DialogBatchAlertConfirmMulti;
export { DialogBatchAlertConfirmMultiProps };
