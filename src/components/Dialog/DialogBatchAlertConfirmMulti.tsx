import { DialogBatchAlert, type DialogBatchAlertProps } from "../../components/Dialog/DialogBatchAlert";
import {
    DialogBatchButtonMultiEndpoint,
    type DialogBatchButtonMultiEndpointProps,
} from "../../components/Dialog/DialogBatchButtonMultiEndpoint";
import { Optional } from "../../definitions/Optional";

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

export { DialogBatchAlertConfirmMulti, type DialogBatchAlertConfirmMultiProps };
