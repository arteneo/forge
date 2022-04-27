import React from "react";
import { useTable } from "../../../components/Table/contexts/Table";
import { Optional } from "../../../utilities/TypescriptOperators";
import ResultButtonLink, { ResultButtonLinkProps } from "../../../components/Table/actions/ResultButtonLink";

type EditProps = Optional<ResultButtonLinkProps, "to">;

const Edit = ({ to, denyKey = "edit", ...props }: EditProps) => {
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
                to: to ?? custom.paths.edit,
                color: "primary",
                variant: "contained",
                denyKey,
                ...props,
            }}
        />
    );
};

export default Edit;
export { EditProps };
