import React from "react";
import VisibleColumnsArrange from "../../components/Common/VisibleColumnsArrange";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";
import DialogVisibleColumnsButtonEndpoint, {
    DialogVisibleColumnsButtonEndpointProps,
} from "../../components/Dialog/DialogVisibleColumnsButtonEndpoint";
import { VisibleColumnsProvider } from "../../contexts/VisibleColumns";
import Optional from "../../definitions/Optional";

interface DialogVisibleColumnsProps extends Optional<DialogProps, "title" | "children" | "dialogProps"> {
    confirmProps: DialogVisibleColumnsButtonEndpointProps;
}

const DialogVisibleColumns = ({
    title = "visibleColumns.dialog.title",
    children = <VisibleColumnsArrange />,
    confirmProps,
    ...props
}: DialogVisibleColumnsProps) => {
    return (
        <VisibleColumnsProvider>
            <Dialog
                {...{ title, children, actions: <DialogVisibleColumnsButtonEndpoint {...confirmProps} />, ...props }}
            />
        </VisibleColumnsProvider>
    );
};

export default DialogVisibleColumns;
export { DialogVisibleColumnsProps };
