import React from "react";
import { Box } from "@mui/material";
import DialogBatchForm, { DialogBatchFormProps } from "../../components/Dialog/DialogBatchForm";
import { renderField } from "../../utilities/common";

type DialogBatchFormFieldsetProps = Omit<DialogBatchFormProps, "children">;

const DialogBatchFormFieldset = ({ formProps, ...props }: DialogBatchFormFieldsetProps) => {
    const fields = formProps.fields;
    const render = renderField(fields);

    return (
        <DialogBatchForm
            {...{
                children: (
                    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                        {Object.keys(fields).map((field) => render(field))}
                    </Box>
                ),
                formProps,
                ...props,
            }}
        />
    );
};

export default DialogBatchFormFieldset;
export { DialogBatchFormFieldsetProps };
