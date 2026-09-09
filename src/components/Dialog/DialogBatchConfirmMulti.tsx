
import { DialogBatch, type DialogBatchProps } from "../../components/Dialog/DialogBatch";
import { DialogBatchButtonMultiEndpoint, type DialogBatchButtonMultiEndpointProps } from "../../components/Dialog/DialogBatchButtonMultiEndpoint";
import { Optional } from "../../definitions/Optional";

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

export { DialogBatchConfirmMulti, type DialogBatchConfirmMultiProps };
