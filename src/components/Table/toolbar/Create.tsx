import React from "react";
import ButtonLink, { ButtonLinkProps } from "../../../components/Common/ButtonLink";
import Optional from "../../../definitions/Optional";

type CreateProps = Optional<ButtonLinkProps, "to">;

const Create = (props: CreateProps) => {
    return (
        <ButtonLink
            {...{
                label: "action.create",
                to: "../create",
                color: "primary",
                variant: "contained",
                ...props,
            }}
        />
    );
};

export default Create;
export { CreateProps };
