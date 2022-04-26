import React from "react";
import { Box } from "@mui/material";
import FieldsInterface from "../definitions/FieldsInterface";
import DialogFormView, { DialogFormViewProps } from "../views/DialogFormView";
import { renderField } from "../../../utilities/common";

interface DialogFieldsetProps extends Omit<DialogFormViewProps, "children"> {
    fields: FieldsInterface;
}

const DialogFieldset = ({ fields, ...dialogFormViewProps }: DialogFieldsetProps) => {
    const render = renderField(fields);

    return (
        <DialogFormView {...dialogFormViewProps}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {Object.keys(fields).map((field) => render(field))}
            </Box>
        </DialogFormView>
    );
};

export default DialogFieldset;
export { DialogFieldsetProps };
