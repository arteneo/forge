import React from "react";
import { getIn } from "formik";
import ColumnPathInterface from "../../../components/Table/definitions/ColumnPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";

interface CollectionRepresentationColumnProps extends ColumnPathInterface {
    separator?: string;
}

const CollectionRepresentationColumn = ({
    result,
    columnName,
    path,
    separator = ", ",
}: CollectionRepresentationColumnProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("CollectionRepresentationColumn component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("CollectionRepresentationColumn component: Missing required result prop");
    }

    const collectionValues: ResultInterface[] = getIn(result, path ? path : columnName, []);

    return <>{collectionValues.map((collectionValue) => collectionValue.representation).join(separator)}</>;
};

export default CollectionRepresentationColumn;
export { CollectionRepresentationColumnProps };
