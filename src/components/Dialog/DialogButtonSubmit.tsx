import React from "react";
import { useFormikContext } from "formik";
import Button, { ButtonProps } from "../../components/Common/Button";
import { useDialog } from "../../contexts/Dialog";

const DialogButtonSubmit = (props: ButtonProps) => {
    const { initialized } = useDialog();
    const { isSubmitting } = useFormikContext();

    return (
        <Button
            {...{
                type: "submit",
                ...props,
                loading: isSubmitting ? true : props.loading,
                disabled: !initialized || isSubmitting ? true : props.disabled,
            }}
        />
    );
};

export default DialogButtonSubmit;
export { ButtonProps as DialogButtonSubmitProps };
