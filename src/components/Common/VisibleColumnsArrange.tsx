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
import { List, Alert, AlertProps, Box } from "@mui/material";
import { SettingsBackupRestore } from "@mui/icons-material";
import VisibleColumnsArrangeItem from "../../components/Common/VisibleColumnsArrangeItem";
import { useVisibleColumns, VisibleColumnInterface } from "../../contexts/VisibleColumns";
import { useDialog } from "../../contexts/Dialog";
import { useTable } from "../../components/Table/contexts/Table";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import ButtonEndpoint, { ButtonEndpointProps } from "../../components/Common/ButtonEndpoint";
import { resolveEndpoint } from "../../utilities/resolve";
import EndpointType from "../../definitions/EndpointType";

interface DialogResetVisibleColumnsButtonEndpointProps extends Omit<ButtonEndpointProps, "endpoint"> {
    endpoint: EndpointType | ((visibleColumnsKey?: string) => EndpointType);
}

interface VisibleColumnsArrangeProps {
    label?: string;
    labelVariables?: TranslateVariablesInterface;
    alertProps?: AlertProps;
    resetVisibleColumnsProps?: DialogResetVisibleColumnsButtonEndpointProps;
}

const VisibleColumnsArrange = ({
    label = "visibleColumns.label",
    labelVariables = {},
    alertProps,
    resetVisibleColumnsProps,
}: VisibleColumnsArrangeProps) => {
    const { t } = useTranslation();
    const { onClose, initialized, payload: payloadColumns } = useDialog();
    const { reloadVisibleColumns, defaultColumns, columns: tableColumns, visibleColumnsKey } = useTable();
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

    const getResetVisibleColumnsButton = () => {
        if (typeof resetVisibleColumnsProps === "undefined") {
            return null;
        }

        const { endpoint: resetVisibleColumnsEndpoint, ...resetVisibleColumnsPropsRest } = resetVisibleColumnsProps;

        const defaultRequestConfig = {
            method: "post",
            data: {
                tableKey: visibleColumnsKey,
                columns: [],
            },
        };

        const resolvedEndpoint =
            typeof resetVisibleColumnsEndpoint === "function"
                ? resetVisibleColumnsEndpoint(visibleColumnsKey)
                : resetVisibleColumnsEndpoint;
        const requestConfig = resolveEndpoint(resolvedEndpoint);
        const resolvedRequestConfig = Object.assign(defaultRequestConfig, requestConfig);

        return (
            <ButtonEndpoint
                {...{
                    label: "visibleColumns.action.reset",
                    color: "warning",
                    variant: "contained",
                    endIcon: <SettingsBackupRestore />,
                    snackbarLabel: "visibleColumns.snackbar.reset",
                    ...resetVisibleColumnsPropsRest,
                    sx: {
                        alignSelf: "flex-end",
                        ...resetVisibleColumnsPropsRest.sx,
                    },
                    endpoint: resolvedRequestConfig,
                    disabled: initialized ? resetVisibleColumnsPropsRest.disabled : true,
                    onSuccess: (defaultOnSuccess, response, setLoading) => {
                        const internalDefaultOnSuccess = () => {
                            defaultOnSuccess();
                            reloadVisibleColumns();
                            onClose();
                        };

                        if (typeof resetVisibleColumnsPropsRest.onSuccess !== "undefined") {
                            resetVisibleColumnsPropsRest.onSuccess(internalDefaultOnSuccess, response, setLoading);
                            return;
                        }

                        internalDefaultOnSuccess();
                    },
                    onCatch: (defaultOnCatch, error, setLoading) => {
                        const internalDefaultOnCatch = () => {
                            defaultOnCatch();
                            onClose();
                        };

                        if (typeof resetVisibleColumnsPropsRest.onCatch !== "undefined") {
                            resetVisibleColumnsPropsRest.onCatch(internalDefaultOnCatch, error, setLoading);
                            return;
                        }

                        internalDefaultOnCatch();
                    },
                }}
            />
        );
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Alert {...{ severity: "info", ...alertProps }}>{t(label, labelVariables)}</Alert>
            {getResetVisibleColumnsButton()}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={columnNames} strategy={verticalListSortingStrategy}>
                    <List {...{ dense: true }}>
                        {columns.map((column) => (
                            <VisibleColumnsArrangeItem key={column.name} {...column} />
                        ))}
                    </List>
                </SortableContext>
            </DndContext>
        </Box>
    );
};

export default VisibleColumnsArrange;
export { VisibleColumnsArrangeProps };
