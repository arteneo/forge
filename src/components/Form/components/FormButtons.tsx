import React from "react";
import { useFormikContext } from "formik";
import { Box } from "@material-ui/core";
import Button, { ButtonProps } from "@arteneo/forge/components/Common/Button";

const FormButtons = ({
    label = "action.form.submit",
    variant = "contained",
    color = "primary",
    type = "submit",
    ...props
}: ButtonProps) => {
    const { isSubmitting } = useFormikContext();

    return (
        <Box mt={4}>
            <Button
                {...{
                    disabled: isSubmitting,
                    label,
                    variant,
                    color,
                    type,
                    ...props,
                }}
            />
        </Box>
    );
};

export default FormButtons;
export { ButtonProps as FormButtonsProps };
