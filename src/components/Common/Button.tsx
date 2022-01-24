import React from "react";
import { useTranslation } from "react-i18next";
import { Button as MuiButton, ButtonProps as MuiButtonProps, Tooltip } from "@mui/material";
import TranslateVariablesInterface from "@arteneo/forge/definitions/TranslateVariablesInterface";
import WrapperInterface from "@arteneo/forge/definitions/WrapperInterface";
import Wrapper from "@arteneo/forge/components/Table/components/Wrapper";
import DeniedAccessInterface from "@arteneo/forge/components/Table/definitions/DeniedAccessInterface";

type InternalWrapperMuiButtonProps = Omit<MuiButtonProps, "children"> & WrapperInterface;

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

const Button = ({
    label,
    labelVariables = {},
    children,
    color,
    deniedAccessList,
    accessKey,
    deniedAccessBehavior = "disable",
    wrapperComponent,
    wrapperComponentProps,
    ...muiButtonProps
}: ButtonProps) => {
    const { t } = useTranslation();

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

    let denyResult: undefined | string = undefined;

    if (typeof accessKey !== "undefined" && typeof deniedAccessList?.[accessKey] !== "undefined") {
        if (deniedAccessBehavior === "hide") {
            return null;
        }

        if (deniedAccessBehavior === "disable") {
            denyResult = deniedAccessList[accessKey];
            muiButtonProps.disabled = true;
        }
    }

    let button = <MuiButton {...{ children, ...muiButtonProps }} />;

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
