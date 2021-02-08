import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonProps } from "@material-ui/core";
import WrapperInterface from "forge-react/definitions/WrapperInterface";
import Wrapper from "forge-react/components/Table/components/Wrapper";
import { useTable } from "forge-react/components/Table/contexts/Table";
import { Link } from "react-router-dom";

interface Props extends WrapperInterface {
    buttonProps?: ButtonProps;
}

const Create: React.FC<Props> = ({
    buttonProps = {
        variant: "contained",
        color: "primary",
    },
    wrapperComponent,
    wrapperComponentProps,
}: Props) => {
    const { t } = useTranslation();
    const { custom } = useTable();

    if (typeof custom?.paths?.create === "undefined") {
        throw new Error(
            "Create component: Missing required paths.create definition in custom variable used by Table context"
        );
    }

    const button = (
        // eslint-disable-next-line
        // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
        <Button component={Link} to={custom.paths.create} {...buttonProps}>
            {t("action.create")}
        </Button>
    );

    return (
        <Wrapper
            {...{
                wrapperComponent,
                wrapperComponentProps,
            }}
        >
            {button}
        </Wrapper>
    );
};

export default Create;
