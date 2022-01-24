import React from "react";
import ButtonLink, { ButtonLinkProps } from "@arteneo/forge/components/Common/ButtonLink";
import TableResultActionPathInterface from "@arteneo/forge/components/Table/definitions/TableResultActionPathInterface";
import TableResultActionResolveType from "@arteneo/forge/components/Table/definitions/TableResultActionResolveType";
import { resolveAnyOrFunction } from "@arteneo/forge/utils/resolve";
import { getIn } from "formik";
import { To } from "react-router-dom";

interface ToProps {
    to: TableResultActionResolveType<To>;
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
    const resolvedTo: To = resolveAnyOrFunction(to, value, result, field);

    return (
        <ButtonLink
            {...{
                to: resolvedTo,
                deniedAccessList: result?.deniedAccessList,
                ...props,
            }}
        />
    );
};

export default ResultButtonLink;
export { ResultButtonLinkProps };
