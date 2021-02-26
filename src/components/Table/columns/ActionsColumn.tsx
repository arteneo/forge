import React from "react";
import { Grid, GridProps } from "@material-ui/core";
import ColumnInterface from "@arteneo/forge/components/Table/definitions/ColumnInterface";

interface ActionsColumnProps extends ColumnInterface {
    children: React.ReactNode;
    gridContainerProps?: GridProps;
}

const ActionsColumn = ({ children, result, field, gridContainerProps }: ActionsColumnProps) => {
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

// * It has to be done via .defaultProps so disableSorting is passed openly to this component and can be read by TableContent
ActionsColumn.defaultProps = {
    disableSorting: true,
};

export default ActionsColumn;
export { ActionsColumnProps };
