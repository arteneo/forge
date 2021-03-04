import React from "react";
import { useTranslation } from "react-i18next";
import CSS from "csstype";

import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@material-ui/core";

interface Props {
    url: string;
    linkText: string;
    style?: CSS.Properties;
}

const Link: React.FC<Props> = ({ url, linkText, style }: Props) => {
    const { t } = useTranslation();

    return (
        <MuiLink component={RouterLink} to={url} underline="always" style={style}>
            {t(linkText)}
        </MuiLink>
    );
};

export default Link;
