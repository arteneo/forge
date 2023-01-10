import React from "react";
import GenericButtonDialog, { ExternalGenericButtonDialogProps } from "../../../components/Common/GenericButtonDialog";
import DialogVisibleColumns, { DialogVisibleColumnsProps } from "../../../components/Dialog/DialogVisibleColumns";

type VisibleColumnsProps = ExternalGenericButtonDialogProps<DialogVisibleColumnsProps>;

const VisibleColumns = (props: VisibleColumnsProps) => {
    return (
        <GenericButtonDialog<DialogVisibleColumnsProps>
            {...{
                component: DialogVisibleColumns,
                // TODO Icon
                ...props,
            }}
        />
    );
};

export default VisibleColumns;
export { VisibleColumnsProps };
