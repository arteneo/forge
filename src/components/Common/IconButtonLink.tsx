import React from "react";
import IconButton, { IconButtonProps } from "../../components/Common/IconButton";
import { Link, LinkProps } from "react-router-dom";

type IconButtonLinkProps = LinkProps & IconButtonProps;

const IconButtonLink = (props: IconButtonLinkProps) => {
    // eslint-disable-next-line
    // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
    return <IconButton component={Link} {...props} />;
};

export default IconButtonLink;
export { IconButtonLinkProps };
