import React from "react";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { ExpandMore, FilterList } from "@mui/icons-material";
import Form from "../../../components/Form/components/Form";
import TableFiltersFieldset from "../../../components/Table/components/TableFiltersFieldset";
import { useTable } from "../../../components/Table/contexts/Table";

const TableFilters = () => {
    const { t } = useTranslation();
    const { filters, filterFields, onSubmitFilters, isFiltersActive } = useTable();

    const [filtersExpanded, setFiltersExpanded] = React.useState(false);

    if (typeof filterFields === "undefined") {
        return null;
    }

    return (
        <Box mb={2}>
            <Accordion
                {...{
                    expanded: filtersExpanded,
                    onChange: () => setFiltersExpanded(!filtersExpanded),
                    sx: {
                        borderLeftWidth: isFiltersActive() ? "4px" : undefined,
                        borderLeftStyle: isFiltersActive() ? "solid" : undefined,
                        borderLeftColor: isFiltersActive() ? "primary.main" : undefined,
                        borderRightWidth: isFiltersActive() ? "4px" : undefined,
                        borderRightStyle: isFiltersActive() ? "solid" : undefined,
                        borderRightColor: isFiltersActive() ? "primary.main" : undefined,
                    },
                    TransitionProps: {
                        unmountOnExit: true,
                    },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box {...{ display: "flex", mr: 1 }}>
                        <FilterList />
                    </Box>
                    <Typography {...{ variant: "body1", component: "h2" }}>
                        {t("table.filters." + (filtersExpanded ? "collapse" : "expand"))}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box p={1} pt={0}>
                        <Form
                            {...{
                                fields: filterFields,
                                initialValues: filters,
                                onSubmit: onSubmitFilters,
                                children: <TableFiltersFieldset {...{ fields: filterFields }} />,
                            }}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default TableFilters;
