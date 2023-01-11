import React from "react";
import { useTranslation } from "react-i18next";
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
import { List, Alert, AlertProps } from "@mui/material";
import VisibleColumnsArrangeItem from "../../components/Common/VisibleColumnsArrangeItem";
import { useVisibleColumns, VisibleColumnInterface } from "../../contexts/VisibleColumns";
import { useDialog } from "../../contexts/Dialog";
import { useTable } from "../../components/Table/contexts/Table";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";

interface VisibleColumnsArrangeProps {
    label?: string;
    labelVariables?: TranslateVariablesInterface;
    alertProps?: AlertProps;
}

const VisibleColumnsArrange = ({
    label = "visibleColumns.label",
    labelVariables,
    alertProps,
}: VisibleColumnsArrangeProps) => {
    const { t } = useTranslation();
    const { initialized, payload: payloadColumns } = useDialog();
    const { defaultColumns, columns: tableColumns } = useTable();
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

        const tableColumnNames = Object.keys(tableColumns);

        // Filter out any columns that are not included in table columns
        const initializedColumns: VisibleColumnInterface[] = payloadColumns.filter(
            (payloadColumn: VisibleColumnInterface) => tableColumnNames.includes(payloadColumn.name)
        );
        tableColumnNames.forEach((tableColumn) => {
            const index = initializedColumns.findIndex((column) => column.name === tableColumn);
            if (index === -1) {
                initializedColumns.push({
                    name: tableColumn,
                    visible: defaultColumns.includes(tableColumn),
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
        <>
            <Alert {...{ severity: "info", ...alertProps }}>{t(label, labelVariables)}</Alert>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={columnNames} strategy={verticalListSortingStrategy}>
                    <List {...{ dense: true }}>
                        {columns.map((column) => (
                            <VisibleColumnsArrangeItem key={column.name} {...column} />
                        ))}
                    </List>
                </SortableContext>
            </DndContext>
        </>
    );
};

export default VisibleColumnsArrange;
export { VisibleColumnsArrangeProps };
