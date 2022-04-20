import React from "react";
import { Box } from "@mui/material";
import { useFormikContext } from "formik";
import { useTable } from "../../../components/Table/contexts/Table";
import Button from "../../../components/Common/Button";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";
import { renderField } from "../../../utils/common";

interface TableFiltersFieldsetProps {
    fields: FieldsInterface;
}

const TableFiltersFieldset = ({ fields }: TableFiltersFieldsetProps) => {
    const { isSubmitting, setFieldValue } = useFormikContext();
    const { clearFilters } = useTable();

    const render = renderField(fields);

    const gridTemplateColumns = {
        xs: "1fr",
        md: "1fr 1fr 1fr",
    };

    const fieldsCount = Object.keys(fields).length;
    switch (fieldsCount) {
        case 1:
            gridTemplateColumns["md"] = "1fr";
            break;
        case 2:
            gridTemplateColumns["md"] = "1fr 1fr";
            break;
    }

    return (
        <>
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns }}>
                {Object.keys(fields).map((field) => render(field))}
            </Box>
            <Box mt={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                    {...{
                        onClick: () => clearFilters(setFieldValue),
                        disabled: isSubmitting,
                        variant: "outlined",
                        color: "warning",
                        label: "table.filters.clear",
                    }}
                />
                <Button
                    {...{
                        disabled: isSubmitting,
                        type: "submit",
                        variant: "contained",
                        color: "primary",
                        label: "table.filters.submit",
                    }}
                />
            </Box>
        </>
    );
};

export default TableFiltersFieldset;
export { TableFiltersFieldsetProps };
