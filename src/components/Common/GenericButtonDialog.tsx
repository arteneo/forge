import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";

interface GenericButtonDialogProps<T> extends ButtonProps {
    // eslint-disable-next-line
    component: React.ComponentType<any>;
    dialogProps: Omit<T, "open" | "onClose"> & {
        onClose?: (defaultOnClose: () => void) => void;
    };
}

const GenericButtonDialog = <T,>({
    component: Component,
    dialogProps,
    ...buttonProps
}: GenericButtonDialogProps<T>) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <Button
                {...{
                    onClick: () => setShowDialog(true),
                    ...buttonProps,
                }}
            />

            <Component
                {...{
                    open: showDialog,
                    ...dialogProps,
                    onClose: () => {
                        const defaultOnClose = () => {
                            setShowDialog(false);
                        };

                        if (typeof dialogProps?.onClose !== "undefined") {
                            dialogProps.onClose(defaultOnClose);
                            return;
                        }

                        defaultOnClose();
                    },
                }}
            />
        </>
    );
};

export default GenericButtonDialog;
export { GenericButtonDialogProps };
