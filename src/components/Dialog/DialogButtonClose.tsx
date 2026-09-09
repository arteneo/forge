import { Close } from "@mui/icons-material";

import { Button, type ButtonProps } from "../../components/Common/Button";
import { useDialog } from "../../contexts/Dialog";

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

export { DialogButtonClose, type DialogButtonCloseProps };
