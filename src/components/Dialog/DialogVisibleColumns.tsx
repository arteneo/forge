
import { Dialog, type DialogProps } from "../../components/Dialog/Dialog";
import { DialogVisibleColumnsButtonEndpoint, type DialogVisibleColumnsButtonEndpointProps } from "../../components/Dialog/DialogVisibleColumnsButtonEndpoint";
import { VisibleColumnsProvider } from "../../contexts/VisibleColumns";
import { Optional } from "../../definitions/Optional";

interface DialogVisibleColumnsProps extends Optional<DialogProps, "title" | "dialogProps"> {
    confirmProps: DialogVisibleColumnsButtonEndpointProps;
}

const DialogVisibleColumns = ({
    title = "visibleColumns.dialog.title",
    confirmProps,
    ...props
}: DialogVisibleColumnsProps) => {
    return (
        <VisibleColumnsProvider>
            <Dialog
                {...{
                    title,
                    actions: <DialogVisibleColumnsButtonEndpoint {...confirmProps} />,
                    ...props,
                    dialogProps: {
                        ...props.dialogProps,
                        PaperProps: { sx: { height: "100%" }, ...props.dialogProps?.PaperProps },
                    },
                }}
            />
        </VisibleColumnsProvider>
    );
};

export { DialogVisibleColumns, type DialogVisibleColumnsProps };
