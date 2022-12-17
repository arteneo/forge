import React from "react";
import { useTranslation } from "react-i18next";
import { DialogTitle as MuiDialogTitle, DialogTitleProps as MuiDialogTitleProps } from "@mui/material";
import TranslateVariablesInterface from "../../definitions/TranslateVariablesInterface";
import ResolveDialogPayloadType from "../../definitions/ResolveDialogPayloadType";
import { useDialog } from "../../contexts/Dialog";
import { resolveDialogPayload } from "../../utilities/resolve";

interface DialogTitleSpecificProps {
    title: ResolveDialogPayloadType<string>;
    titleVariables?: ResolveDialogPayloadType<TranslateVariablesInterface>;
}

type DialogTitleProps = DialogTitleSpecificProps & Omit<MuiDialogTitleProps, "title">;

const DialogTitle = ({ title, titleVariables = {}, ...props }: DialogTitleProps) => {
    const { payload, initialized } = useDialog();
    const { t } = useTranslation();

    const resolvedTitle = resolveDialogPayload<string>(title, payload, initialized);
    const resolvedTitleVariables = resolveDialogPayload<TranslateVariablesInterface>(
        titleVariables,
        payload,
        initialized
    );

    return <MuiDialogTitle {...props}>{t(resolvedTitle, resolvedTitleVariables)}</MuiDialogTitle>;
};

export default DialogTitle;
export { DialogTitleSpecificProps, DialogTitleProps };
