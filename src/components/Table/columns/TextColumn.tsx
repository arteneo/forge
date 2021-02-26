import React from "react";
import { getIn } from "formik";
import ColumnPathInterface from "@arteneo/forge/components/Table/definitions/ColumnPathInterface";

const TextColumn = ({ result, field, path }: ColumnPathInterface) => {
    if (typeof field === "undefined") {
        return null;
    }

    return <>{getIn(result, path ? path : field)}</>;
};

export default TextColumn;
export { ColumnPathInterface as TextColumnProps };
