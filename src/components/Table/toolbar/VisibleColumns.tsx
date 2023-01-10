import React from "react";
import { ViewColumn } from "@mui/icons-material";
import GenericIconButtonDialog, {
    ExternalGenericIconButtonDialogProps,
} from "../../../components/Common/GenericIconButtonDialog";
import DialogVisibleColumns, { DialogVisibleColumnsProps } from "../../../components/Dialog/DialogVisibleColumns";
import Optional from "../../../definitions/Optional";
import { useTable } from "../../../components/Table/contexts/Table";
import { resolveEndpoint } from "../../../utilities/resolve";

type VisibleColumnsProps = Optional<
    ExternalGenericIconButtonDialogProps<DialogVisibleColumnsProps>,
    "icon" | "dialogProps"
>;

const VisibleColumns = (props: VisibleColumnsProps) => {
    const { visibleColumnsKey, visibleColumnsEndpoint } = useTable();

    if (typeof visibleColumnsKey === "undefined") {
        return null;
    }

    const visibleColumnsRequestConfig = resolveEndpoint(visibleColumnsEndpoint);

    if (typeof visibleColumnsRequestConfig === "undefined") {
        return null;
    }

    return (
        <GenericIconButtonDialog<DialogVisibleColumnsProps>
            {...{
                component: DialogVisibleColumns,
                icon: <ViewColumn />,
                tooltip: "visibleColumns.action",
                dialogProps: {
                    initializeEndpoint: Object.assign(
                        {
                            method: "post",
                            data: { tableKey: visibleColumnsKey },
                        },
                        visibleColumnsRequestConfig
                    ),
                },
                ...props,
            }}
        />
    );
};

export default VisibleColumns;
export { VisibleColumnsProps };
