import React from "react";
import IconButton, { IconButtonProps } from "@arteneo/forge/components/Common/IconButton";
import { Link } from "react-router-dom";
import { LocationDescriptor } from "history";

interface IconButtonLinkToProps {
    to: LocationDescriptor;
}

type IconButtonLinkProps = IconButtonLinkToProps & IconButtonProps;

const IconButtonLink = ({ to, ...props }: IconButtonLinkProps) => {
    // eslint-disable-next-line
    // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
    return <IconButton component={Link} to={to} {...props} />;
};

export default IconButtonLink;
export { IconButtonLinkProps };
