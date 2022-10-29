import React from "react";
import Optional from "../../../definitions/Optional";
import ColumnInterface from "../../../components/Table/definitions/ColumnInterface";
import ButtonLink, { ButtonLinkProps } from "../../../components/Common/ButtonLink";

type ResultEditProps = Optional<ButtonLinkProps, "to"> & ColumnInterface;

const ResultEdit = ({ result, ...props }: ResultEditProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultEdit component: Missing required result prop");
    }

    return (
        <ButtonLink
            {...{
                label: "action.edit",
                to: "../edit/" + result?.id,
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
