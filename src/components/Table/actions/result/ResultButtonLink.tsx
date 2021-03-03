import React from "react";
import ButtonLink, { ButtonLinkProps } from "@arteneo/forge/components/Common/ButtonLink";
import TableResultActionPathInterface from "@arteneo/forge/components/Table/definitions/TableResultActionPathInterface";
import TableResultActionResolveType from "@arteneo/forge/components/Table/definitions/TableResultActionResolveType";
import { resolveAnyOrFunction } from "@arteneo/forge/utils/resolve";
import { LocationDescriptor } from "history";
import { getIn } from "formik";

interface ToProps {
    to: TableResultActionResolveType<LocationDescriptor>;
}

type ResultButtonLinkProps = Omit<ButtonLinkProps, "to"> & TableResultActionPathInterface & ToProps;

const ResultButtonLink = ({ to, result, field, path, ...props }: ResultButtonLinkProps) => {
    if (typeof field === "undefined") {
        throw new Error("ResultButtonLink component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ResultButtonLink component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;
    const resolvedTo: LocationDescriptor = resolveAnyOrFunction(to, value, result, field);

    return (
        <ButtonLink
            {...{
                to: resolvedTo,
                ...props,
            }}
        />
    );
};

export default ResultButtonLink;
export { ResultButtonLinkProps };
