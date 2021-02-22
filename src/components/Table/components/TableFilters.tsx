import React from "react";
import clsx from "clsx";
import Form from "@arteneo/forge/components/Form/components/Form";
import TableFiltersButtons from "@arteneo/forge/components/Table/components/TableFiltersButtons";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Grid,
    GridProps,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { ExpandMore, FilterList } from "@material-ui/icons";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";

interface Props {
    filters: FieldsInterface;
}

const useStyles = makeStyles((theme) => ({
    accordion: {
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        marginBottom: theme.spacing(4),
        borderRadius: "4px",
        "&:before": {
            display: "none",
        },
    },
    accordionActive: {
        borderLeft: "4px solid " + theme.palette.primary.main,
        borderRight: "4px solid " + theme.palette.primary.main,
    },
    titleIcon: {
        display: "flex",
        marginRight: theme.spacing(1.5),
    },
    gridContainer: {
        padding: theme.spacing(0, 0, 4, 0),
    },
    gridItem: {
        padding: theme.spacing(0, 4) + " !important",
    },
}));

const TableFilters: React.FC<Props> = ({ filters }: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { filters: filterValues, filtersExpanded, setFiltersExpanded, onSubmitFilters, isFiltersActive } = useTable();

    // eslint-disable-next-line
    const getFieldGridProps = (): GridProps => {
        const gridProps: GridProps = {
            xs: 12,
        };

        const filtersLength = Object.keys(filters).length;
        if (filtersLength === 2) {
            gridProps.sm = 6;
        }

        if (filtersLength === 3) {
            gridProps.sm = 6;
            gridProps.lg = 4;
        }

        if (filtersLength === 4) {
            gridProps.sm = 6;
        }

        if (filtersLength > 4) {
            gridProps.sm = 6;
            gridProps.lg = 4;
        }

        return gridProps;
    };

    return (
        <Accordion
            className={clsx(classes.accordion, isFiltersActive() && classes.accordionActive)}
            expanded={filtersExpanded}
            onChange={() => setFiltersExpanded(!filtersExpanded)}
            TransitionProps={{
                unmountOnExit: true,
            }}
        >
            <AccordionSummary expandIcon={<ExpandMore />}>
                <div className={classes.titleIcon}>
                    <FilterList />
                </div>
                <Typography variant="body1" component="h2">
                    {t("crud." + (filtersExpanded ? "filtersCollapse" : "filtersExpand"))}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box p={2} display="flex" flexGrow={1}>
                    <Form
                        fields={filters}
                        initialValues={filterValues}
                        onSubmit={onSubmitFilters}
                        buttons={<TableFiltersButtons />}
                        disablePromptIfDirty
                    >
                        <Grid container spacing={8} className={classes.gridContainer}>
                            {Object.keys(filters).map((field) => (
                                <Grid item className={classes.gridItem} key={field} {...getFieldGridProps()}>
                                    {React.cloneElement(filters[field], {
                                        name: filters[field].props.name || field,
                                    })}
                                </Grid>
                            ))}
                        </Grid>
                    </Form>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default TableFilters;
export { Props };
