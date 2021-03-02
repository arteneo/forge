import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Prompt } from "react-router-dom";
import * as beforeunload from "react-beforeunload";

interface PromptIfDirtyProps {
    label?: string;
}

const PromptIfDirty = ({ label = "crud.formPromptDirty" }: PromptIfDirtyProps) => {
    const formik = useFormikContext();
    const { t } = useTranslation();

    const showPrompt = formik.dirty && formik.submitCount === 0;

    beforeunload.useBeforeunload(() => {
        if (showPrompt) {
            return t(label);
        }
    });

    return <Prompt when={showPrompt} message={t(label)} />;
};

export default PromptIfDirty;
export { PromptIfDirtyProps };
