import React from "react";
import { Box } from "@mui/material";
import DialogBatchFormMulti, { DialogBatchFormMultiProps } from "../../components/Dialog/DialogBatchFormMulti";
import { renderField } from "../../utilities/common";

type DialogBatchFormMultiFieldsetProps = Omit<DialogBatchFormMultiProps, "children">;

const DialogBatchFormMultiFieldset = ({ formProps, ...props }: DialogBatchFormMultiFieldsetProps) => {
    const fields = formProps.fields;
    const render = renderField(fields);

    return (
        <DialogBatchFormMulti
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

export default DialogBatchFormMultiFieldset;
export { DialogBatchFormMultiFieldsetProps };
