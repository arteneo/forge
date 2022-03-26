import React from "react";
import { Grid, GridProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";

interface TableFiltersFieldsetProps {
    filters: FieldsInterface;
}

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        padding: theme.spacing(0, 0, 4, 0),
    },
    gridItem: {
        padding: theme.spacing(0, 4) + " !important",
    },
}));

const TableFiltersFieldset = ({ filters }: TableFiltersFieldsetProps) => {
    const classes = useStyles();

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
        <Grid container spacing={8} className={classes.gridContainer}>
            {Object.keys(filters).map((field) => (
                <Grid item className={classes.gridItem} key={field} {...getFieldGridProps()}>
                    {React.cloneElement(filters[field], {
                        name: filters[field].props.name || field,
                    })}
                </Grid>
            ))}
        </Grid>
    );
};

export default TableFiltersFieldset;
export { TableFiltersFieldsetProps };
