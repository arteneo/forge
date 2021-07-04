import { makeStyles } from "@material-ui/core";
import React from "react";

interface ToolbarProps {
    children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
    toolbar: {
        width: "100%",
        display: "flex",
    },
}));

const Toolbar = ({ children }: ToolbarProps) => {
    const classes = useStyles();

    return <div className={classes.toolbar}>{children}</div>;
};

export default Toolbar;
export { ToolbarProps };
