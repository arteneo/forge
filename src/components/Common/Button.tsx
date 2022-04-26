import React from "react";
import { useTranslation } from "react-i18next";
import { Button as MuiButton, ButtonProps as MuiButtonProps, Tooltip } from "@mui/material";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import DenyPropInterface from "../../components/Table/definitions/DenyPropInterface";

type InternalMuiButtonProps = Omit<MuiButtonProps, "children">;

interface LabelChildrenProps {
    label?: string;
    labelVariables?: TranslateVariablesInterface;
    children?: React.ReactNode;
}

type ButtonProps = InternalMuiButtonProps & LabelChildrenProps & DenyPropInterface;

const Button = ({
    label,
    labelVariables = {},
    children,
    deny,
    denyKey,
    denyBeheviour = "disable",
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

    let denyMessage: undefined | string = undefined;

    if (typeof denyKey !== "undefined" && typeof deny?.[denyKey] !== "undefined") {
        if (denyBeheviour === "hide") {
            return null;
        }

        if (denyBeheviour === "disable") {
            denyMessage = deny[denyKey];
            muiButtonProps.disabled = true;
        }
    }

    let button = <MuiButton {...{ children, ...muiButtonProps }} />;

    if (typeof denyMessage !== "undefined") {
        button = (
            // t(denyResult) ?? "" just to satisfy TypeScript
            <Tooltip title={t(denyMessage) ?? ""}>
                <span>{button}</span>
            </Tooltip>
        );
    }

    return button;
};

export default Button;
export { ButtonProps };
