import React from "react";
import Button, { ButtonProps } from "@arteneo/forge/components/Common/Button";
import { Link } from "react-router-dom";
import { LocationDescriptor } from "history";

interface ButtonLinkToProps {
    to: LocationDescriptor;
}

type ButtonLinkProps = ButtonLinkToProps & ButtonProps;

const ButtonLink = ({ to, ...props }: ButtonLinkProps) => {
    // eslint-disable-next-line
    // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
    return <Button component={Link} to={to} {...props} />;
};

export default ButtonLink;
export { ButtonLinkProps };
