import React from "react";
import Optional from "../../../definitions/Optional";
import ColumnInterface from "../../../components/Table/definitions/ColumnInterface";
import ResultButtonLink, { ResultButtonLinkProps } from "../../../components/Table/actions/ResultButtonLink";

type ResultEditProps = Optional<ResultButtonLinkProps, "to"> & ColumnInterface;

const ResultEdit = ({ result, ...props }: ResultEditProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultEdit component: Missing required result prop");
    }

    return (
        <ResultButtonLink
            {...{
                label: "action.edit",
                to: "../edit/" + result?.id,
                color: "primary",
                variant: "contained",
                denyKey: "edit",
                result,
                ...props,
            }}
        />
    );
};

export default ResultEdit;
export { ResultEditProps };
