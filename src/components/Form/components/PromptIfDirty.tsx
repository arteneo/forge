import React from "react";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Prompt } from "react-router-dom";
import * as beforeunload from "react-beforeunload";

interface Props {
    label?: string;
}

const PromptIfDirty: React.FC<Props> = ({ label = "crud.formPromptDirty" }: Props) => {
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
