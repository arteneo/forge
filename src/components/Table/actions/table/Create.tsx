import React from "react";
import { useTable } from "@arteneo/forge/components/Table/contexts/Table";
import ButtonLink, { ButtonLinkProps } from "@arteneo/forge/components/Common/ButtonLink";
import ColumnInterface from "@arteneo/forge/components/Table/definitions/ColumnInterface";

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
type CreateProps = Optional<ButtonLinkProps & ColumnInterface, "to">;

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
