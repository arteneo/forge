import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import { Link, To } from "react-router-dom";

interface IconButtonLinkToProps {
    to: To;
}

type IconButtonLinkProps = IconButtonLinkToProps & IconButtonProps;

const IconButtonLink = ({ to, ...props }: IconButtonLinkProps) => {
    // eslint-disable-next-line
    // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
    return <IconButton component={Link} to={to} {...props} />;
};

export default IconButtonLink;
export { IconButtonLinkProps };
