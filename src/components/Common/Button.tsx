import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Tooltip } from "@mui/material";
import LoadingButton, { LoadingButtonProps } from "../../components/Common/LoadingButton";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import DenyPropInterface from "../../components/Table/definitions/DenyPropInterface";

type InternalButtonProps = Omit<LoadingButtonProps, "children">;

interface LabelChildrenProps {
    label?: string;
    labelVariables?: TranslateVariablesInterface;
    children?: React.ReactNode;
}

type ButtonProps = InternalButtonProps & LabelChildrenProps & DenyPropInterface;

const Button = ({
    label,
    labelVariables,
    children,
    deny,
    denyKey,
    denyBehavior = "disable",
    ...props
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
        if (denyBehavior === "hide") {
            return null;
        }

        if (denyBehavior === "disable") {
            denyMessage = deny[denyKey];
            props.disabled = true;
        }
    }

    let button = <LoadingButton {...{ children, ...props }} />;

    if (typeof denyMessage !== "undefined") {
        button = (
            // t(denyResult) ?? "" just to satisfy TypeScript
            <Tooltip title={t(denyMessage) ?? ""}>
                <Box {...{ component: "span", sx: { display: "inline-flex" } }}>{button}</Box>
            </Tooltip>
        );
    }

    return button;
};

export default Button;
export { ButtonProps };
