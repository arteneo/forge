import React from "react";
import { Grid, GridProps } from "@material-ui/core";

interface Props {
    children: React.ReactNode;
    // result is added to props by TableContent
    // eslint-disable-next-line
    result?: any;
    // field is added to props by TableContent
    field?: string;
    disableSorting?: boolean;
    gridContainerProps?: GridProps;
}

const Actions: React.FC<Props> = ({ children, result, field, gridContainerProps }: Props) => {
    if (typeof field === "undefined") {
        return null;
    }

    return (
        <Grid container spacing={1} justify="center" wrap="nowrap" {...gridContainerProps}>
            {React.Children.map(children, (child, key) => (
                <React.Fragment key={key}>
                    {React.isValidElement(child) &&
                        React.cloneElement(child, {
                            result: result,
                            field: field,
                            wrapperComponent: Grid,
                            wrapperComponentProps: {
                                item: true,
                            },
                        })}
                </React.Fragment>
            ))}
        </Grid>
    );
};

Actions.defaultProps = {
    disableSorting: true,
};

export default Actions;
