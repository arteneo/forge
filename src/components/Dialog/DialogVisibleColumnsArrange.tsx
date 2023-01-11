import React from "react";
import VisibleColumnsArrange, { VisibleColumnsArrangeProps } from "../../components/Common/VisibleColumnsArrange";
import DialogVisibleColumns, { DialogVisibleColumnsProps } from "../../components/Dialog/DialogVisibleColumns";

interface DialogVisibleColumnsArrangeProps extends Omit<DialogVisibleColumnsProps, "children"> {
    arrangeProps?: VisibleColumnsArrangeProps;
}

const DialogVisibleColumnsArrange = ({ arrangeProps, ...props }: DialogVisibleColumnsArrangeProps) => {
    return <DialogVisibleColumns {...{ children: <VisibleColumnsArrange {...arrangeProps} />, ...props }} />;
};

export default DialogVisibleColumnsArrange;
export { DialogVisibleColumnsArrangeProps };
