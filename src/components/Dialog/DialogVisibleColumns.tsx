import React from "react";
import VisibleColumnsArrange from "../../components/Common/VisibleColumnsArrange";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";
import { VisibleColumnsProvider } from "../../contexts/VisibleColumns";
import Optional from "../../definitions/Optional";

type DialogVisibleColumnsProps = Optional<DialogProps, "title" | "children" | "dialogProps">;

const DialogVisibleColumns = ({
    title = "visibleColumns.dialog.title",
    children = <VisibleColumnsArrange />,
    actions = <>Submit!</>,
    ...props
}: DialogVisibleColumnsProps) => {
    return (
        <VisibleColumnsProvider>
            <Dialog {...{ title, children, actions, ...props }} />
        </VisibleColumnsProvider>
    );
};

export default DialogVisibleColumns;
export { DialogVisibleColumnsProps };
