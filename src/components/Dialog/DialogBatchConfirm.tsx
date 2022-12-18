import React from "react";
import { Check } from "@mui/icons-material";
import Optional from "../../definitions/Optional";
import DialogBatch, { DialogBatchProps } from "../../components/Dialog/DialogBatch";
import DialogButtonEndpoint, { DialogButtonEndpointProps } from "../../components/Dialog/DialogButtonEndpoint";

interface DialogBatchConfirmProps extends Optional<DialogBatchProps, "title"> {
    confirmProps: DialogButtonEndpointProps;
}

const DialogBatchConfirm = ({ confirmProps, ...props }: DialogBatchConfirmProps) => {
    return (
        <DialogBatch
            {...{
                title: "dialogConfirm.title",
                actions: (
                    // TODO
                    // DialogButtonBatchEndpoint -> endpoint: (result) => endpoint, disableCloseOnSuccess, onSuccess, onCatch
                    <DialogButtonEndpoint
                        {...{
                            label: "action.confirm",
                            color: "success",
                            endIcon: <Check />,
                            ...confirmProps,
                        }}
                    />
                ),
                ...props,
            }}
        />
    );
};

export default DialogBatchConfirm;
export { DialogBatchConfirmProps };
