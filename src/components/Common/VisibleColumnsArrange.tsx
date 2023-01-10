import React from "react";
import { List } from "@mui/material";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import VisibleColumnsArrangeItem from "../../components/Common/VisibleColumnsArrangeItem";
import { useVisibleColumns, VisibleColumnInterface } from "../../contexts/VisibleColumns";
import { useDialog } from "../../contexts/Dialog";
import { useTable } from "../../components/Table/contexts/Table";

const VisibleColumnsArrange = () => {
    const { initialized, payload: payloadColumns } = useDialog();
    const { columns: tableColumns } = useTable();
    const { columns, setColumns } = useVisibleColumns();

    React.useEffect(() => initialize(), [initialized]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const initialize = () => {
        if (!initialized) {
            return;
        }

        const initializedColumns: VisibleColumnInterface[] = payloadColumns;

        Object.keys(tableColumns).forEach((tableColumn) => {
            const index = initializedColumns.findIndex((column) => column.name === tableColumn);
            if (index === -1) {
                initializedColumns.push({
                    name: tableColumn,
                    visible: false,
                    position: initializedColumns.length,
                });
            }
        });

        setColumns(initializedColumns);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over !== null && active.id !== over.id) {
            setColumns((columns) => {
                const oldIndex = columns.findIndex((column) => column.name === active.id);
                const newIndex = columns.findIndex((column) => column.name === over.id);

                return arrayMove(columns, oldIndex, newIndex);
            });
        }
    };

    const columnNames = columns.map((column) => column.name);

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={columnNames} strategy={verticalListSortingStrategy}>
                <List {...{ dense: true }}>
                    {columns.map((column) => (
                        <VisibleColumnsArrangeItem key={column.name + column.visible} {...column} />
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
};

export default VisibleColumnsArrange;
