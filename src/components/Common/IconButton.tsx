import React from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps, Tooltip } from "@mui/material";
import DenyPropInterface from "../../components/Table/definitions/DenyPropInterface";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";

type InternalMuiIconButtonProps = Omit<MuiIconButtonProps, "children">;

interface IconProps {
    icon: React.ReactNode;
    tooltip?: string;
    tooltipVariables?: TranslateVariablesInterface;
}

type IconButtonProps = InternalMuiIconButtonProps & IconProps & DenyPropInterface;

const IconButton = ({
    icon,
    tooltip,
    tooltipVariables = {},
    deny,
    denyKey,
    denyBehavior = "disable",
    ...muiIconButtonProps
}: IconButtonProps) => {
    const { t } = useTranslation();

    let denyMessage: undefined | string = undefined;

    if (typeof denyKey !== "undefined" && typeof deny?.[denyKey] !== "undefined") {
        if (denyBehavior === "hide") {
            return null;
        }

        if (denyBehavior === "disable") {
            denyMessage = deny[denyKey];
            muiIconButtonProps.disabled = true;
        }
    }

    let button = <MuiIconButton {...{ children: icon, ...muiIconButtonProps }} />;

    let tooltipTitle: null | string = null;
    if (typeof denyMessage !== "undefined") {
        tooltipTitle = t(denyMessage);
    } else if (tooltip) {
        tooltipTitle = t(tooltip, tooltipVariables);
    }

    if (tooltipTitle !== null) {
        button = (
            <Tooltip title={tooltipTitle}>
                <Box {...{ component: "span", sx: { display: "inline-flex" } }}>{button}</Box>
            </Tooltip>
        );
    }

    return button;
};

export default IconButton;
export { IconButtonProps };
