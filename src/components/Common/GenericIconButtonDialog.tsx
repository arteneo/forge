import React from "react";
import Optional from "../../definitions/Optional";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";

interface GenericIconButtonDialogProps<T> extends IconButtonProps {
    // eslint-disable-next-line
    component: React.ComponentType<any>;
    dialogProps: Omit<T, "open" | "onClose"> & {
        onClose?: (defaultOnClose: () => void) => void;
    };
}

// Props typings to be used by IconButtonDialogX which by design have component defined
type ExternalGenericIconButtonDialogProps<T> = Omit<GenericIconButtonDialogProps<T>, "component">;

const GenericIconButtonDialog = <T,>({
    component: Component,
    dialogProps,
    ...buttonProps
}: GenericIconButtonDialogProps<T>) => {
    const [showDialog, setShowDialog] = React.useState(false);

    return (
        <>
            <IconButton
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

export default GenericIconButtonDialog;
export { ExternalGenericIconButtonDialogProps, GenericIconButtonDialogProps };
