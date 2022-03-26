import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps, Tooltip } from "@mui/material";
import WrapperInterface from "../../definitions/WrapperInterface";
import Wrapper from "../../components/Table/components/Wrapper";
import DeniedAccessInterface from "../../components/Table/definitions/DeniedAccessInterface";

type InternalWrapperMuiIconButtonProps = Omit<MuiIconButtonProps, "children"> & WrapperInterface;

interface IconProps {
    icon: React.ReactNode;
}

type IconButtonProps = InternalWrapperMuiIconButtonProps & IconProps & DeniedAccessInterface;

const IconButton = ({
    icon,
    deniedAccessList,
    accessKey,
    deniedAccessBehavior = "disable",
    wrapperComponent,
    wrapperComponentProps,
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
