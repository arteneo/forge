import React from "react";
import ButtonLink, { ButtonLinkProps } from "@arteneo/forge/components/Common/ButtonLink";
import ColumnInterface from "@arteneo/forge/components/Table/definitions/ColumnInterface";
import { resolveAnyOrFunction } from "@arteneo/forge/utils/resolve";

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
type ResultActionLinkProps = Optional<ButtonLinkProps & ColumnInterface, "to">;

const ResultActionLink = ({ result, to, ...props }: ResultActionLinkProps) => {
    if (typeof to === "undefined") {
        throw new Error(
            "ResultActionLink component: Missing required to prop  definition in custom variable used by Table context"
        );
    }
    // TODO add security
    const resolvedTo = resolveAnyOrFunction(to, result);

    return (
        <ButtonLink
            {...{
                to: resolvedTo,
                ...props,
            }}
        />
    );
};

export default ResultActionLink;
export { ResultActionLinkProps };
