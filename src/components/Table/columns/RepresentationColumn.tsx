import React from "react";
import { getIn } from "formik";
import TableColumnPathType from "@arteneo/forge/components/Table/definitions/TableColumnPathType";

const RepresentationColumn = ({ result, field, path }: TableColumnPathType) => {
    if (typeof field === "undefined") {
        throw new Error("RepresentationColumn component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("RepresentationColumn component: Missing required result prop");
    }

    const value = getIn(result, path ? path : field);
    return <>{value?.representation}</>;
};

export default RepresentationColumn;
export { TableColumnPathType as RepresentationColumnProps };
