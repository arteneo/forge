import React from "react";
import { useTable } from "../../../../components/Table/contexts/Table";
import { Optional } from "../../../../utilities/TypescriptOperators";
import ResultButtonLink, { ResultButtonLinkProps } from "../../../../components/Table/actions/result/ResultButtonLink";

type EditProps = Optional<ResultButtonLinkProps, "to">;

const Edit = ({ to, accessKey = "edit", ...props }: EditProps) => {
    const { custom } = useTable();

    if (typeof to === "undefined" && typeof custom?.paths?.edit === "undefined") {
        throw new Error(
            "Edit component: Missing required to prop or paths.edit definition in custom variable used by Table context"
        );
    }

    return (
        <ResultButtonLink
            {...{
                label: "action.edit",
                to: to ? to : custom.paths.edit,
                color: "primary",
                variant: "contained",
                accessKey,
                ...props,
            }}
        />
    );
};

export default Edit;
export { EditProps };
