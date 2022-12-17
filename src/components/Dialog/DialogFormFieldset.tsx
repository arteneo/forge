import React from "react";
import { Box } from "@mui/material";
import DialogForm, { DialogFormProps } from "../../components/Dialog/DialogForm";
import { renderField } from "../../utilities/common";

type DialogFormFieldsetProps = Omit<DialogFormProps, "children">;

const DialogFormFieldset = ({ formProps, ...props }: DialogFormFieldsetProps) => {
    const fields = formProps.fields;
    const render = renderField(fields);

    return (
        <DialogForm
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

export default DialogFormFieldset;
export { DialogFormFieldsetProps };
