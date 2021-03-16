import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import Button from "@arteneo/forge/components/Common/Button";
import {
    Box,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Tooltip,
    makeStyles,
    ListProps,
    IconButtonProps,
} from "@material-ui/core";
import { useSnackbar } from "@arteneo/forge/contexts/Snackbar";
import { useHandleCatch } from "@arteneo/forge/contexts/HandleCatch";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragIndicator, ViewColumn } from "@material-ui/icons";
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";
import Wrapper from "@arteneo/forge/components/Table/components/Wrapper";

interface EditTableColumnsProps extends WrapperInterface {
    label?: string;
    snackbarLabel?: string;
    endpoint?: string;
    listProps?: ListProps;
    iconButtonProps?: IconButtonProps;
}

interface EditTableColumnsSortableColumn {
    id: string;
    name: string;
}

// eslint-disable-next-line
type DroppableProvided = any;
// eslint-disable-next-line
type DraggableProvided = any;

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    dialogContent: {
        // Required to avoid react-beautiful-dnd raising warnings
        overflow: "unset",
    },
    listItem: {
        background: "white",
        cursor: "pointer !important",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.grey[300],
        marginBottom: theme.spacing(2),
    },
    dialogActions: {
        margin: theme.spacing(2),
        justifyContent: "space-between",
    },
    list: {
        border: `2px solid ${theme.palette.grey[300]}`,
        padding: "4px",
    },
}));

const EditTableColumns = ({
    label = "action.editTableColumns.edit",
    snackbarLabel = "snackbar.editTableColumns.saved",
    endpoint,
    wrapperComponent,
    wrapperComponentProps,
    listProps = {},
    iconButtonProps = {},
}: EditTableColumnsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { tableKey, row, columns, defaultColumns, custom, updateColumns } = useTable();
    const { showSuccess } = useSnackbar();
    const handleCatch = useHandleCatch();
    const { showLoader, hideLoader } = useLoader();
    const [dialog, setDialog] = React.useState(false);
    const [sortableColumns, setSortableColumns] = React.useState<EditTableColumnsSortableColumn[]>([]);
    const [sortableSelectedColumns, setSortableSelectedColumns] = React.useState<EditTableColumnsSortableColumn[]>([]);

    if (typeof tableKey === "undefined") {
        return null;
    }

    if (typeof endpoint === "undefined" && typeof custom?.endpoints?.editTableColumns === "undefined") {
        throw new Error(
            "EditTableColumns component: Missing required endpoint prop or endpoints.editTableColumns definition in custom variable used by Table context"
        );
    }

    React.useEffect(() => initialize(), [columns]);

    const initialize = () => {
        const sortableSelectedColumns = Object.keys(columns).map((column) => ({
            id: column,
            name: column,
        }));
        setSortableSelectedColumns(sortableSelectedColumns);

        const sortableColumns = Object.keys(row)
            .filter((column) => !sortableSelectedColumns.map((item) => item.name).includes(column))
            .map((column) => ({
                id: column,
                name: column,
            }));
        setSortableColumns(sortableColumns);
    };

    const edit = () => {
        setDialog(false);
        showLoader();

        const columns = sortableSelectedColumns.map((column) => column.name);
        const resolvedEndpoint = endpoint ? endpoint : custom.endpoints.editTableColumns;

        axios
            .post(resolvedEndpoint, {
                tableKey,
                columns,
            })
            .then((response) => {
                hideLoader();

                showSuccess(snackbarLabel);

                updateColumns(response.data);
            })
            .catch((error) => handleCatch(error));
    };

    const reset = () => {
        const sortableSelectedColumns = Object.keys(defaultColumns).map((column) => ({
            id: column,
            name: column,
        }));
        setSortableSelectedColumns(sortableSelectedColumns);

        const sortableColumns = Object.keys(row)
            .filter((column) => !sortableSelectedColumns.map((item) => item.name).includes(column))
            .map((column) => ({
                id: column,
                name: column,
            }));
        setSortableColumns(sortableColumns);
    };

    const getList = (name: string): EditTableColumnsSortableColumn[] => {
        if (name === "all") {
            return sortableColumns;
        }

        return sortableSelectedColumns;
    };

    // eslint-disable-next-line
    const reorder = (list: any, startIndex: any, endIndex: any): EditTableColumnsSortableColumn[] => {
        const result: EditTableColumnsSortableColumn[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    // eslint-disable-next-line
    const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        // eslint-disable-next-line
        const result: any = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    // eslint-disable-next-line
    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(getList(source.droppableId), source.index, destination.index);

            if (source.droppableId === "selected") {
                setSortableSelectedColumns(items);
            } else {
                setSortableColumns(items);
            }
        } else {
            const result = move(getList(source.droppableId), getList(destination.droppableId), source, destination);

            setSortableColumns(result.all);
            setSortableSelectedColumns(result.selected);
        }
    };

    return (
        <>
            <Wrapper
                {...{
                    wrapperComponent,
                    wrapperComponentProps: {
                        className: classes.wrapper,
                        ...wrapperComponentProps,
                    },
                }}
            >
                <Tooltip placement="left" title={t(label) ?? ""}>
                    <IconButton size="small" onClick={() => setDialog(true)} {...iconButtonProps}>
                        <ViewColumn />
                    </IconButton>
                </Tooltip>
            </Wrapper>

            {/* Hide dialog after started editing to avoid items being shuffled to initial state */}
            {dialog && (
                <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth maxWidth="md">
                    <DialogTitle>{t("crud.editTableColumns.title")}</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="h4">
                                        {t("crud.editTableColumns.all")}
                                    </Typography>

                                    <Droppable droppableId="all">
                                        {(provided: DroppableProvided) => (
                                            <List ref={provided.innerRef} {...listProps}>
                                                {sortableColumns.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided: DraggableProvided) => (
                                                            <ListItem
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={classes.listItem}
                                                            >
                                                                <ListItemIcon>
                                                                    <DragIndicator />
                                                                </ListItemIcon>
                                                                <ListItemText primary={t("label." + item.name)} />
                                                            </ListItem>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </List>
                                        )}
                                    </Droppable>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom variant="h4">
                                        {t("crud.editTableColumns.selected")}
                                    </Typography>

                                    <Droppable droppableId="selected">
                                        {(provided: DroppableProvided) => (
                                            <List ref={provided.innerRef} {...listProps}>
                                                {sortableSelectedColumns.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided: DraggableProvided) => (
                                                            <ListItem
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={classes.listItem}
                                                            >
                                                                <ListItemIcon>
                                                                    <DragIndicator />
                                                                </ListItemIcon>
                                                                <ListItemText primary={t("label." + item.name)} />
                                                            </ListItem>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </List>
                                        )}
                                    </Droppable>
                                </Grid>
                            </Grid>
                        </DragDropContext>
                    </DialogContent>

                    <DialogActions>
                        <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Button onClick={() => setDialog(false)} variant="contained">
                                        {t("action.cancel")}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        {...{
                                            label: "action.editTableColumns.reset",
                                            color: "primary",
                                            variant: "contained",
                                            onClick: () => reset(),
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                {...{
                                    label: "action.editTableColumns.submit",
                                    color: "primary",
                                    variant: "contained",
                                    onClick: () => edit(),
                                }}
                            />
                        </Box>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default EditTableColumns;
export { EditTableColumnsProps, EditTableColumnsSortableColumn };
