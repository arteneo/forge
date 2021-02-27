import React from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@material-ui/core";

interface TableActionsProps {
    children?: React.ReactNode;
}

const TableActions = ({ children }: TableActionsProps) => {
    if (typeof children === "undefined") {
        return null;
    }

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box pb={isSm ? 2 : 4}>
            <Grid container spacing={1}>
                {React.Children.map(children, (child, key) => (
                    <React.Fragment key={key}>
                        {React.isValidElement(child) &&
                            React.cloneElement(child, {
                                wrapperComponent: Grid,
                                wrapperComponentProps: {
                                    item: true,
                                },
                            })}
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    );
};

export default TableActions;
export { TableActionsProps };
