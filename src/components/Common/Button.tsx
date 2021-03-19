import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button as MuiButton, ButtonProps as MuiButtonProps, makeStyles, Tooltip } from "@material-ui/core";
import TranslateVariablesInterface from "@arteneo/forge/definitions/TranslateVariablesInterface";
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";
import Wrapper from "@arteneo/forge/components/Table/components/Wrapper";
import DeniedAccessInterface from "@arteneo/forge/components/Table/definitions/DeniedAccessInterface";

interface InternalMuiButtonProps extends Omit<Omit<MuiButtonProps, "color">, "children"> {
    color?: "default" | "inherit" | "primary" | "secondary" | "success" | "warning" | "error";
}

type InternalWrapperMuiButtonProps = InternalMuiButtonProps & WrapperInterface;

interface LabelChildrenProps {
    /** The description for myProp */
    label?: string;
    /**
     * A description of the prop that you seem fit :)
     */
    labelVariables?: TranslateVariablesInterface;
    children?: React.ReactNode;
}

type ButtonProps = InternalWrapperMuiButtonProps & LabelChildrenProps & DeniedAccessInterface;

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
    labelVariables = {},
    children,
    color,
    className,
    deniedAccessList,
    accessKey,
    deniedAccessBehavior = "disable",
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
        children = t(label, labelVariables);
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

    let denyResult = undefined;

    if (typeof accessKey !== "undefined" && typeof deniedAccessList?.[accessKey] !== "undefined") {
        if (deniedAccessBehavior === "hide") {
            return null;
        }

        if (deniedAccessBehavior === "disable") {
            denyResult = deniedAccessList[accessKey];
            muiButtonProps.disabled = true;
        }
    }

    let button = <MuiButton {...{ children, color: resolvedColor, className: resolvedClassName, ...muiButtonProps }} />;

    if (typeof denyResult !== "undefined") {
        button = (
            // t(denyResult) ?? "" just to satisfy TypeScript
            <Tooltip title={t(denyResult) ?? ""}>
                <span>{button}</span>
            </Tooltip>
        );
    }

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
