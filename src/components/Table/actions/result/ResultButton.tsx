import React from "react";
import Button, { ButtonProps } from "@arteneo/forge/components/Common/Button";
import TableResultActionInterface from "@arteneo/forge/components/Table/definitions/TableResultActionInterface";

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
                ...props,
            }}
        />
    );
};

export default ResultButton;
export { ResultButtonProps };
