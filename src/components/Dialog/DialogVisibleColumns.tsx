import React from "react";
import Dialog, { DialogProps } from "../../components/Dialog/Dialog";
import { VisibleColumnsProvider } from "../../contexts/VisibleColumns";
import Optional from "../../definitions/Optional";

type DialogVisibleColumnsProps = Optional<DialogProps, "title">;

const DialogVisibleColumns = ({ title = "dialogVisibleColumns.title", ...props }: DialogVisibleColumnsProps) => {
    return (
        <VisibleColumnsProvider>
            <Dialog {...{ title, ...props }} />
        </VisibleColumnsProvider>
    );
};

export default DialogVisibleColumns;
export { DialogVisibleColumnsProps };
