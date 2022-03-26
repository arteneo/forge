import React from "react";
import { getIn } from "formik";
import TableColumnPathType from "../../../components/Table/definitions/TableColumnPathType";

const TextColumn = ({ result, field, path }: TableColumnPathType) => {
    if (typeof field === "undefined") {
        throw new Error("TextColumn component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("TextColumn component: Missing required result prop");
    }

    return <>{getIn(result, path ? path : field)}</>;
};

export default TextColumn;
export { TableColumnPathType as TextColumnProps };
