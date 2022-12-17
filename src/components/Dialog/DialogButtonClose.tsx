import React from "react";
import { Close } from "@mui/icons-material";
import { useDialog } from "../../contexts/Dialog";
import Button, { ButtonProps } from "../../components/Common/Button";

interface DialogButtonCloseProps extends Omit<ButtonProps, "onClick"> {
    onClick?: (defaultOnClick: () => void) => void;
}

const DialogButtonClose = ({
    label = "action.close",
    color = "warning",
    variant = "contained",
    startIcon = <Close />,
    onClick,
    ...props
}: DialogButtonCloseProps) => {
    const { onClose } = useDialog();

    return (
        <Button
            {...{
                label,
                color,
                variant,
                startIcon,
                ...props,
                onClick: () => {
                    if (typeof onClick !== "undefined") {
                        onClick(onClose);
                        return;
                    }

                    onClose();
                },
            }}
        />
    );
};

export default DialogButtonClose;
export { DialogButtonCloseProps };
