import React from "react";
import { Grid, GridProps } from "@mui/material";
import TableColumnType from "../../../components/Table/definitions/TableColumnType";

interface ActionsColumnProps extends TableColumnType {
    children: React.ReactNode;
    gridContainerProps?: GridProps;
}

const ActionsColumn = ({ children, result, field, gridContainerProps }: ActionsColumnProps) => {
    if (typeof field === "undefined") {
        throw new Error("ActionsColumn component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ActionsColumn component: Missing required result prop");
    }

    return (
        <Grid container spacing={1} justifyContent="center" alignItems="center" wrap="nowrap" {...gridContainerProps}>
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
