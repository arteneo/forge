import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
    getLabel: (constKey: string) => string;
    // result is added to props by TableContent
    // eslint-disable-next-line
    result?: any;
    // field is added to props by TableContent
    field?: string;
    disableSorting?: boolean;
}

const Const: React.FC<Props> = ({ getLabel, result, field }: Props) => {
    if (typeof field === "undefined") {
        return null;
    }

    const { t } = useTranslation();

    return <>{result[field] && t(getLabel(result[field]))}</>;
};

export default Const;
