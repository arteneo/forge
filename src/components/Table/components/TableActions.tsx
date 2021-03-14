import React from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@material-ui/core";

interface TableActionsProps {
    children?: React.ReactNode;
    pbCustom?: number;
}

const TableActions = ({ children, pbCustom }: TableActionsProps) => {
    if (typeof children === "undefined") {
        return null;
    }

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));
    const defaultPb = isSm ? 2 : 4;

    return (
        <Box pb={pbCustom !== undefined ? pbCustom : defaultPb}>
            <Grid container spacing={1}>
                {React.Children.map(children, (child, key) => (
                    <React.Fragment key={key}>
                        {React.isValidElement(child) &&
                            React.cloneElement(child, {
                                wrapperComponent: Grid,
                                wrapperComponentProps: {
                                    item: true,
                                    className: child.props.className || "",
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
