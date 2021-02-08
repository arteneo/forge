import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonProps } from "@material-ui/core";
import WrapperInterface from "forge-react/definitions/WrapperInterface";
import Wrapper from "forge-react/components/Table/components/Wrapper";
import { useTable } from "forge-react/components/Table/contexts/Table";
import { Link } from "react-router-dom";

interface Props extends WrapperInterface {
    // result is added to props by TableContent
    // eslint-disable-next-line
    result?: any;
    // field is added to props by TableContent
    field?: string;
    disableSorting?: boolean;
    buttonProps?: ButtonProps;
}

const Edit: React.FC<Props> = ({
    result,
    field,
    buttonProps = {
        variant: "contained",
        color: "primary",
    },
    wrapperComponent,
    wrapperComponentProps,
}: Props) => {
    if (typeof field === "undefined") {
        return null;
    }

    const { t } = useTranslation();
    const { custom } = useTable();

    if (typeof custom?.paths?.edit === "undefined") {
        throw new Error(
            "Edit component: Missing required paths.edit definition in custom variable used by Table context"
        );
    }

    const button = (
        // eslint-disable-next-line
        // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
        <Button component={Link} to={() => custom.paths.edit(result)} {...buttonProps}>
            {t("action.edit")}
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

export default Edit;
