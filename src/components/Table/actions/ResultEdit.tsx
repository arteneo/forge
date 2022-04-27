import React from "react";
import { useTable } from "../../../components/Table/contexts/Table";
import Optional from "../../../definitions/Optional";
import ResultButtonLink, { ResultButtonLinkProps } from "../../../components/Table/actions/ResultButtonLink";

type ResultEditProps = Optional<ResultButtonLinkProps, "to">;

const ResultEdit = ({ to, ...props }: ResultEditProps) => {
    const { custom } = useTable();

    if (typeof to === "undefined" && typeof custom?.paths?.edit === "undefined") {
        throw new Error(
            "ResultEdit component: Missing required to prop or paths.edit definition in custom variable used by Table context"
        );
    }

    return (
        <ResultButtonLink
            {...{
                label: "action.edit",
                to: to ?? custom.paths.edit,
                color: "primary",
                variant: "contained",
                denyKey: "edit",
                ...props,
            }}
        />
    );
};

export default ResultEdit;
export { ResultEditProps };
