import React from "react";
import Button, { ButtonProps } from "../../components/Common/Button";
import { Link, LinkProps } from "react-router-dom";

type ButtonLinkProps = LinkProps & ButtonProps;

const ButtonLink = (props: ButtonLinkProps) => {
    // eslint-disable-next-line
    // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
    return <Button component={Link} {...props} />;
};

export default ButtonLink;
export { ButtonLinkProps };
