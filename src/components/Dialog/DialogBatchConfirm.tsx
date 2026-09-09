import { DialogBatch, type DialogBatchProps } from "../../components/Dialog/DialogBatch";
import {
    DialogBatchButtonEndpoint,
    type DialogBatchButtonEndpointProps,
} from "../../components/Dialog/DialogBatchButtonEndpoint";
import { Optional } from "../../definitions/Optional";

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
                batchProgressProps: {
                    variant: "indeterminate",
                    ...props?.batchProgressProps,
                },
            }}
        />
    );
};

export { DialogBatchConfirm, type DialogBatchConfirmProps };
