import React from "react";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import ButtonLink, { ButtonLinkProps } from "@arteneo/forge/components/Common/ButtonLink";
import ColumnInterface from "@arteneo/forge/components/Table/definitions/ColumnInterface";
import { resolveAnyOrFunction } from "@arteneo/forge/utils/resolve";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";

type EditProps = Optional<ButtonLinkProps & ColumnInterface, "to">;

const Edit = ({ result, to, ...props }: EditProps) => {
    const { custom } = useTable();

    if (typeof to === "undefined" && typeof custom?.paths?.edit === "undefined") {
        throw new Error(
            "Edit component: Missing required to prop or paths.edit definition in custom variable used by Table context"
        );
    }

    const resolvedTo = to ? resolveAnyOrFunction(to, result) : custom.paths.edit(result);

    return (
        <ButtonLink
            {...{
                label: "action.edit",
                to: resolvedTo,
                color: "primary",
                variant: "contained",
                ...props,
            }}
        />
    );
};

export default Edit;
export { EditProps };
