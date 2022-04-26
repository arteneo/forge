import React from "react";
import { Box } from "@mui/material";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";
import DialogFormView, { DialogFormViewProps } from "../../../components/Form/views/DialogFormView";
import { renderField } from "../../../utilities/common";

interface FieldsetProps extends Omit<DialogFormViewProps, "children"> {
    fields: FieldsInterface;
}

const Fieldset = ({ fields, ...formViewProps }: FieldsetProps) => {
    const render = renderField(fields);

    return (
        <DialogFormView {...formViewProps}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {Object.keys(fields).map((field) => render(field))}
            </Box>
        </DialogFormView>
    );
};

export default Fieldset;
export { FieldsetProps };
