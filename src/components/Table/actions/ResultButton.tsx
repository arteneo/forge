import React from "react";
import Button, { ButtonProps } from "../../../components/Common/Button";
import ColumnActionInterface from "../../../components/Table/definitions/ColumnActionInterface";

type ResultButtonProps = ButtonProps & ColumnActionInterface;

const ResultButton = ({ result, columnName, ...props }: ResultButtonProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("ResultButton component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ResultButton component: Missing required result prop");
    }

    return (
        <Button
            {...{
                deny: result?.deny,
                ...props,
            }}
        />
    );
};

export default ResultButton;
export { ResultButtonProps };
