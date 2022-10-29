import React from "react";
import { getIn } from "formik";
import { To } from "react-router-dom";
import ButtonLink, { ButtonLinkProps } from "../../../components/Common/ButtonLink";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultResolveType from "../../../components/Table/definitions/ResultResolveType";
import { resolveAnyOrFunction } from "../../../utilities/resolve";

interface ResultButtonLinkSpecificProps {
    to: ResultResolveType<To>;
}

type ResultButtonLinkProps = Omit<ButtonLinkProps, "to"> & ColumnActionPathInterface & ResultButtonLinkSpecificProps;

const ResultButtonLink = ({ to, result, path, ...props }: ResultButtonLinkProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultButtonLink component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;
    const resolvedTo: To = resolveAnyOrFunction(to, value, result, path);

    return (
        <ButtonLink
            {...{
                to: resolvedTo,
                deny: result?.deny,
                ...props,
            }}
        />
    );
};

export default ResultButtonLink;
export { ResultButtonLinkProps, ResultButtonLinkSpecificProps };
