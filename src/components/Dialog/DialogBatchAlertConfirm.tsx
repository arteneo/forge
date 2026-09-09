import { DialogBatchAlert, type DialogBatchAlertProps } from "../../components/Dialog/DialogBatchAlert";
import {
    DialogBatchButtonEndpoint,
    type DialogBatchButtonEndpointProps,
} from "../../components/Dialog/DialogBatchButtonEndpoint";
import { Optional } from "../../definitions/Optional";

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
                batchProgressProps: {
                    variant: "indeterminate",
                    ...props?.batchProgressProps,
                },
            }}
        />
    );
};

export { DialogBatchAlertConfirm, type DialogBatchAlertConfirmProps };
