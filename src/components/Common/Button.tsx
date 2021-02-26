import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button as MuiButton, ButtonProps as MuiButtonProps, makeStyles } from "@material-ui/core";
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";
import Wrapper from "@arteneo/forge/components/Table/components/Wrapper";

interface InternalMuiButtonProps extends Omit<Omit<MuiButtonProps, "color">, "children"> {
    color?: "default" | "inherit" | "primary" | "secondary" | "success" | "warning" | "error";
}

type InternalWrapperMuiButtonProps = InternalMuiButtonProps & WrapperInterface;

interface LabelChildrenProps {
    label?: string;
    children?: React.ReactNode;
}

type ButtonProps = InternalWrapperMuiButtonProps & LabelChildrenProps;

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

const Button = ({
    label,
    children,
    color,
    className,
    wrapperComponent,
    wrapperComponentProps,
    ...muiButtonProps
}: ButtonProps) => {
    const { t } = useTranslation();
    const classes = useStyles();

    // Using ButtonProps typing definition that allows only label OR only children to be defined
    // gives missleading error when using none of them or both of them
    // Decided to go with Error throwing to make it easier for developers
    if (children === undefined && label === undefined) {
        throw new Error("Button component: Missing children or label prop");
    }

    if (children !== undefined && label !== undefined) {
        throw new Error("Button component: It is not possible to use children and label prop at the same time");
    }

    if (children === undefined && label !== undefined) {
        children = t(label);
    }

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

    const button = (
        <MuiButton {...{ children, color: resolvedColor, className: resolvedClassName, ...muiButtonProps }} />
    );

    return (
        <Wrapper
            {...{
                children: button,
                wrapperComponent,
                wrapperComponentProps,
            }}
        />
    );
};

export default Button;
export { ButtonProps };
