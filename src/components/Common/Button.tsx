import React from "react";
import clsx from "clsx";
import { Button as MuiButton, ButtonProps, makeStyles } from "@material-ui/core";

interface Props extends Omit<ButtonProps, "color"> {
    color?: "default" | "inherit" | "primary" | "secondary" | "success" | "warning" | "error";
}

const useStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.success.dark,
        },
    },
    warning: {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    error: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
        },
    },
}));

const Button: React.FC<Props> = ({ color, className, ...props }: Props) => {
    const classes = useStyles();

    let resolvedClassName = className;
    let resolvedColor = undefined;

    if (color === "primary" || color === "secondary" || color === "default" || color === "inherit") {
        resolvedColor = color;
    }

    if (color === "success") {
        resolvedClassName = clsx(resolvedClassName, classes.success);
    }

    if (color === "warning") {
        resolvedClassName = clsx(resolvedClassName, classes.warning);
    }

    if (color === "error") {
        resolvedClassName = clsx(resolvedClassName, classes.error);
    }

    return <MuiButton className={resolvedClassName} color={resolvedColor} {...props} />;
};

export default Button;
export { Props };
