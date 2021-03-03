import React from "react";
import LinkElement from "@arteneo/forge/components/Form/elements/Link";
import { FormControl, FormControlProps, LinkProps } from "@material-ui/core";
import CSS from "csstype";

interface Props extends LinkProps {
    label: string;
    url: string;
    formControlProps?: FormControlProps;
    style?: CSS.Properties;
}

const Link = ({ label, url, formControlProps, style }: Props): React.ReactElement => {
    if (typeof name === "undefined") {
        throw new Error("Link component: name is required prop. By default it is injected by FormContent.");
    }

    return (
        <FormControl {...formControlProps}>
            <LinkElement url={url} linkText={label} style={style} />
        </FormControl>
    );
};

export default Link;
export { Props };
