import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps, Tooltip } from "@mui/material";
import DeniedAccessInterface from "../../components/Table/definitions/DeniedAccessInterface";

type InternalMuiIconButtonProps = Omit<MuiIconButtonProps, "children">;

interface IconProps {
    icon: React.ReactNode;
}

type IconButtonProps = InternalMuiIconButtonProps & IconProps & DeniedAccessInterface;

const IconButton = ({
    icon,
    deniedAccessList,
    accessKey,
    deniedAccessBehavior = "disable",
    ...muiIconButtonProps
}: IconButtonProps) => {
    const { t } = useTranslation();

    let denyResult: undefined | string = undefined;

    if (typeof accessKey !== "undefined" && typeof deniedAccessList?.[accessKey] !== "undefined") {
        if (deniedAccessBehavior === "hide") {
            return null;
        }

        if (deniedAccessBehavior === "disable") {
            denyResult = deniedAccessList[accessKey];
            muiIconButtonProps.disabled = true;
        }
    }

    let button = <MuiIconButton {...{ children: icon, ...muiIconButtonProps }} />;

    if (typeof denyResult !== "undefined") {
        button = (
            // t(denyResult) ?? "" just to satisfy TypeScript
            <Tooltip title={t(denyResult) ?? ""}>
                <span>{button}</span>
            </Tooltip>
        );
    }

    return button;
};

export default IconButton;
export { IconButtonProps };
