import React from "react";
import { Check } from "@mui/icons-material";
import { useFormikContext } from "formik";
import Button, { ButtonProps } from "../../components/Common/Button";
import { useDialog } from "../../contexts/Dialog";

const DialogButtonSubmit = ({
    label = "action.submit",
    color = "success",
    variant = "contained",
    endIcon = <Check />,
    type = "submit",
    ...props
}: ButtonProps) => {
    const { initialized } = useDialog();
    const { isSubmitting } = useFormikContext();

    return (
        <Button
            {...{
                label,
                color,
                variant,
                endIcon,
                type,
                ...props,
                loading: isSubmitting ? true : props.loading,
                disabled: !initialized || isSubmitting ? true : props.disabled,
            }}
        />
    );
};

export default DialogButtonSubmit;
export { ButtonProps as DialogButtonSubmitProps };
