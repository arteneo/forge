import React from "react";
import { getIn } from "formik";
import ColumnPathInterface from "@arteneo/forge/components/Table/definitions/ColumnPathInterface";

const RepresentationColumn = ({ result, field, path }: ColumnPathInterface) => {
    if (typeof field === "undefined") {
        return null;
    }

    const value = getIn(result, path ? path : field);
    return <>{value?.representation}</>;
};

export default RepresentationColumn;
export { ColumnPathInterface as RepresentationColumnProps };
