import React from "react";
import { useTranslation } from "react-i18next";
import { getIn } from "formik";
import ColumnPathInterface from "../../../components/Table/definitions/ColumnPathInterface";
import Enum from "../../../classes/Enum";

interface EnumColumnProps extends ColumnPathInterface {
    enum: Enum;
}

const EnumColumn = ({ enum: enumClass, result, columnName, path }: EnumColumnProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("EnumColumn component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("EnumColumn component: Missing required result prop");
    }

    const { t } = useTranslation();

    const value = getIn(result, path ? path : columnName);
    return <>{value && t(enumClass.getLabel(value))}</>;
};

export default EnumColumn;
export { EnumColumnProps };
