import { ViewColumn } from "@mui/icons-material";

import {
    GenericIconButtonDialog,
    type ExternalGenericIconButtonDialogProps,
} from "../../../components/Common/GenericIconButtonDialog";
import {
    DialogVisibleColumnsArrange,
    type DialogVisibleColumnsArrangeProps,
} from "../../../components/Dialog/DialogVisibleColumnsArrange";
import { useTable } from "../../../components/Table/contexts/Table";
import { Optional } from "../../../definitions/Optional";
import { resolveEndpoint } from "../../../utilities/resolve";

type VisibleColumnsProps = Optional<ExternalGenericIconButtonDialogProps<DialogVisibleColumnsArrangeProps>, "icon">;

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
        <GenericIconButtonDialog<DialogVisibleColumnsArrangeProps>
            {...{
                component: DialogVisibleColumnsArrange,
                icon: <ViewColumn />,
                tooltip: "visibleColumns.tooltip",
                ...props,
                dialogProps: {
                    initializeEndpoint: Object.assign(
                        {
                            method: "post",
                            data: { tableKey: visibleColumnsKey },
                        },
                        visibleColumnsRequestConfig,
                    ),
                    ...props.dialogProps,
                },
            }}
        />
    );
};

export { VisibleColumns, type VisibleColumnsProps };
