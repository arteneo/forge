import React from "react";
import { Link, LinkProps } from "react-router-dom";
import Button, { ButtonProps } from "../../components/Common/Button";

type ButtonLinkProps = LinkProps & ButtonProps;

const ButtonLink = (props: ButtonLinkProps) => {
    // eslint-disable-next-line
    // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
    return <Button component={Link} {...props} />;
};

export default ButtonLink;
export { ButtonLinkProps };
