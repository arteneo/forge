import React from "react";
import { useTranslation } from "react-i18next";
import { getIn } from "formik";
import TableColumnPathType from "../../../components/Table/definitions/TableColumnPathType";

interface ConstColumnProps extends TableColumnPathType {
    getLabel: (constKey: string) => string;
}

const ConstColumn = ({ getLabel, result, field, path }: ConstColumnProps) => {
    if (typeof field === "undefined") {
        throw new Error("ConstColumn component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ConstColumn component: Missing required result prop");
    }

    const { t } = useTranslation();

    const value = getIn(result, path ? path : field);
    return <>{value && t(getLabel(value))}</>;
};

export default ConstColumn;
export { ConstColumnProps };
