import React from "react";
import { getIn } from "formik";
import ColumnPathInterface from "../../../components/Table/definitions/ColumnPathInterface";

const RepresentationColumn = ({ result, columnName, path }: ColumnPathInterface) => {
    if (typeof columnName === "undefined") {
        throw new Error("RepresentationColumn component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("RepresentationColumn component: Missing required result prop");
    }

    const value = getIn(result, path ? path : columnName);
    return <>{value?.representation}</>;
};

export default RepresentationColumn;
export { ColumnPathInterface as RepresentationColumnProps };
