import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragIndicator } from "@mui/icons-material";
import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useVisibleColumns, VisibleColumnInterface } from "../../contexts/VisibleColumns";

type VisibleColumnsArrangeItemProps = Pick<VisibleColumnInterface, "name">;

const VisibleColumnsArrangeItem = ({ name }: VisibleColumnsArrangeItemProps) => {
    const { t } = useTranslation();
    const { columns, setColumns } = useVisibleColumns();
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: name });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const index = columns.findIndex((column) => column.name === name);

    const toggleVisible = () => {
        setColumns((columns) => {
            const column = columns[index];
            if (typeof column === "undefined") {
                return columns;
            }

            const newColumns = [...columns];
            newColumns.splice(index, 1, {
                ...column,
                visible: !column.visible,
            });

            return newColumns;
        });
    };

    return (
        <ListItem
            ref={setNodeRef}
            style={style}
            {...attributes}
            secondaryAction={
                <Checkbox
                    {...{
                        edge: "end",
                        onChange: () => toggleVisible(),
                        checked: columns[index]?.visible,
                    }}
                />
            }
            sx={{
                paddingLeft: 1,
                backgroundColor: "white",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "grey.300",
                borderRadius: 1,
                my: 0.5,
            }}
        >
            <ListItemIcon {...listeners}>
                <IconButton {...{ sx: { cursor: "move" }, disableFocusRipple: true, size: "small" }}>
                    <DragIndicator {...{ fontSize: "small" }} />
                </IconButton>
            </ListItemIcon>
            <ListItemText primary={t("label." + name)} />
        </ListItem>
    );
};

export { VisibleColumnsArrangeItem, type VisibleColumnsArrangeItemProps };
