import React from "react";
import { useTranslation } from "react-i18next";
import { getIn } from "formik";
import ColumnPathInterface from "@arteneo/forge/components/Table/definitions/ColumnPathInterface";

interface ConstColumnProps extends ColumnPathInterface {
    getLabel: (constKey: string) => string;
}

const ConstColumn = ({ getLabel, result, field, path }: ConstColumnProps) => {
    if (typeof field === "undefined") {
        return null;
    }

    const { t } = useTranslation();

    const value = getIn(result, path ? path : field);
    return <>{value && t(getLabel(value))}</>;
};

export default ConstColumn;
export { ConstColumnProps };
