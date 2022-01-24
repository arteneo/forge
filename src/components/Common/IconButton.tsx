import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import {
    IconButton as MuiIconButton,
    IconButtonProps as MuiIconButtonProps,
    makeStyles,
    Tooltip,
} from "@mui/material";
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";
import Wrapper from "@arteneo/forge/components/Table/components/Wrapper";
import DeniedAccessInterface from "@arteneo/forge/components/Table/definitions/DeniedAccessInterface";

interface InternalMuiIconButtonProps extends Omit<Omit<MuiIconButtonProps, "color">, "children"> {
    color?: "default" | "inherit" | "primary" | "secondary" | "success" | "warning" | "error";
}

type InternalWrapperMuiIconButtonProps = InternalMuiIconButtonProps & WrapperInterface;

interface IconProps {
    icon: React.ReactNode;
}

type IconButtonProps = InternalWrapperMuiIconButtonProps & IconProps & DeniedAccessInterface;

const useStyles = makeStyles((theme) => ({
    success: {
        color: theme.palette.success.main,
        "&:hover": {
            color: theme.palette.success.dark,
        },
    },
    warning: {
        color: theme.palette.warning.main,
        "&:hover": {
            color: theme.palette.warning.dark,
        },
    },
    error: {
        color: theme.palette.error.main,
        "&:hover": {
            color: theme.palette.error.dark,
        },
    },
}));

const IconButton = ({
    icon,
    color,
    className,
    deniedAccessList,
    accessKey,
    deniedAccessBehavior = "disable",
    wrapperComponent,
    wrapperComponentProps,
    ...muiIconButtonProps
}: IconButtonProps) => {
    const { t } = useTranslation();
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

    let denyResult = undefined;

    if (typeof accessKey !== "undefined" && typeof deniedAccessList?.[accessKey] !== "undefined") {
        if (deniedAccessBehavior === "hide") {
            return null;
        }

        if (deniedAccessBehavior === "disable") {
            denyResult = deniedAccessList[accessKey];
            muiIconButtonProps.disabled = true;
        }
    }

    let button = (
        <MuiIconButton
            {...{ children: icon, color: resolvedColor, className: resolvedClassName, ...muiIconButtonProps }}
        />
    );

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

export default IconButton;
export { IconButtonProps };
