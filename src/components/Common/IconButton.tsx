import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps, Tooltip } from "@mui/material";
import DenyPropInterface from "../../components/Table/definitions/DenyPropInterface";

type InternalMuiIconButtonProps = Omit<MuiIconButtonProps, "children">;

interface IconProps {
    icon: React.ReactNode;
}

type IconButtonProps = InternalMuiIconButtonProps & IconProps & DenyPropInterface;

const IconButton = ({ icon, deny, denyKey, denyBeheviour = "disable", ...muiIconButtonProps }: IconButtonProps) => {
    const { t } = useTranslation();

    let denyMessage: undefined | string = undefined;

    if (typeof denyKey !== "undefined" && typeof deny?.[denyKey] !== "undefined") {
        if (denyBeheviour === "hide") {
            return null;
        }

        if (denyBeheviour === "disable") {
            denyMessage = deny[denyKey];
            muiIconButtonProps.disabled = true;
        }
    }

    let button = <MuiIconButton {...{ children: icon, ...muiIconButtonProps }} />;

    if (typeof denyMessage !== "undefined") {
        button = (
            // t(denyMessage) ?? "" just to satisfy TypeScript
            <Tooltip title={t(denyMessage) ?? ""}>
                <span>{button}</span>
            </Tooltip>
        );
    }

    return button;
};

export default IconButton;
export { IconButtonProps };
