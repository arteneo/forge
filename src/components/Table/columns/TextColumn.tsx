import React from "react";
import { getIn } from "formik";
import ColumnPathInterface from "../../../components/Table/definitions/ColumnPathInterface";

const TextColumn = ({ result, columnName, path }: ColumnPathInterface) => {
    if (typeof columnName === "undefined") {
        throw new Error("TextColumn component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("TextColumn component: Missing required result prop");
    }

    return <>{getIn(result, path ? path : columnName)}</>;
};

export default TextColumn;
export { ColumnPathInterface as TextColumnProps };
