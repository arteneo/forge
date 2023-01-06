import React from "react";
import DialogButtonSubmit, { DialogButtonSubmitProps } from "../../components/Dialog/DialogButtonSubmit";
import { useDialogBatch } from "../../contexts/DialogBatch";

const DialogBatchButtonSubmit = (props: DialogButtonSubmitProps) => {
    const { finished } = useDialogBatch();

    return (
        <DialogButtonSubmit
            {...{
                ...props,
                disabled: finished ? true : props.disabled,
            }}
        />
    );
};

export default DialogBatchButtonSubmit;
export { DialogButtonSubmitProps as DialogBatchButtonSubmitProps };
