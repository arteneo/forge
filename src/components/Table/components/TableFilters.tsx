import React from "react";
import clsx from "clsx";
import Form from "../../../components/Form/components/Form";
import TableFiltersButtons from "../../../components/Table/components/TableFiltersButtons";
import { useTable } from "../../../components/Table/contexts/Table";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { ExpandMore, FilterList } from "@mui/icons-material";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";

interface TableFiltersProps {
    filtersFieldset: React.ElementType;
    filters: FieldsInterface;
    filterClass?: { accordion: string; accordionActive: string };
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
}));

const TableFilters = ({ filters, filterClass, filtersFieldset }: TableFiltersProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { filters: filterValues, filtersExpanded, setFiltersExpanded, onSubmitFilters, isFiltersActive } = useTable();

    const accordionClass = filterClass?.accordion ? filterClass.accordion : classes.accordion;
    const accordionActiveClass = filterClass?.accordionActive ? filterClass.accordionActive : classes.accordionActive;

    const FiltersFieldset = filtersFieldset;

    return (
        <Accordion
            className={clsx(accordionClass, isFiltersActive() && accordionActiveClass)}
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
                    >
                        <FiltersFieldset filters={filters} />
                    </Form>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default TableFilters;
export { TableFiltersProps };
