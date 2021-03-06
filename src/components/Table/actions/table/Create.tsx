import React from "react";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import ButtonLink, { ButtonLinkProps } from "@arteneo/forge/components/Common/ButtonLink";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";

type CreateProps = Optional<ButtonLinkProps, "to">;

const Create = ({ to, ...props }: CreateProps) => {
    const { custom } = useTable();

    if (typeof to === "undefined" && typeof custom?.paths?.create === "undefined") {
        throw new Error(
            "Create component: Missing required to prop or paths.create definition in custom variable used by Table context"
        );
    }

    return (
        <ButtonLink
            {...{
                label: "action.create",
                to: to ? to : custom.paths.create,
                color: "primary",
                variant: "contained",
                ...props,
            }}
        />
    );
};

export default Create;
export { CreateProps };
