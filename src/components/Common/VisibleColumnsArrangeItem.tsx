import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
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
            const newColumns = [...columns];

            newColumns.splice(index, 1, {
                ...columns[index],
                visible: !columns[index].visible,
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
                        checked: columns[index].visible,
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

export default VisibleColumnsArrangeItem;
export { VisibleColumnsArrangeItemProps };
