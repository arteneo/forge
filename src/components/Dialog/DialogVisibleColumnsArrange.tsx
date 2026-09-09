import { VisibleColumnsArrange, type VisibleColumnsArrangeProps } from "../../components/Common/VisibleColumnsArrange";
import { DialogVisibleColumns, type DialogVisibleColumnsProps } from "../../components/Dialog/DialogVisibleColumns";

interface DialogVisibleColumnsArrangeProps extends Omit<DialogVisibleColumnsProps, "children"> {
    arrangeProps?: VisibleColumnsArrangeProps;
}

const DialogVisibleColumnsArrange = ({ arrangeProps, ...props }: DialogVisibleColumnsArrangeProps) => {
    return <DialogVisibleColumns {...{ children: <VisibleColumnsArrange {...arrangeProps} />, ...props }} />;
};

export { DialogVisibleColumnsArrange, type DialogVisibleColumnsArrangeProps };
