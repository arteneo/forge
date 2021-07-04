import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

interface ToolbarProps {
    children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
    toolbar: {
        width: "100%",
        display: "flex",
    },
}));

const Toolbar = ({ children }: ToolbarProps) => {
    const classes = useStyles();

    return <Paper className={classes.toolbar}>{children}</Paper>;
};

export default Toolbar;
export { ToolbarProps };
