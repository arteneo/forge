import React from "react";
import Button, { ButtonProps } from "../../../../components/Common/Button";
import TableResultActionInterface from "../../../../components/Table/definitions/TableResultActionInterface";

type ResultButtonProps = ButtonProps & TableResultActionInterface;

const ResultButton = ({ result, field, ...props }: ResultButtonProps) => {
    if (typeof field === "undefined") {
        throw new Error("ResultButton component: Missing required field prop");
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
