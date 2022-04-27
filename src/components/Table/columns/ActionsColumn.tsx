import React from "react";
import { Box } from "@mui/material";
import ColumnInterface from "../../../components/Table/definitions/ColumnInterface";

interface ActionsColumnProps extends ColumnInterface {
    children: React.ReactNode;
}

const ActionsColumn = ({ children, result, columnName }: ActionsColumnProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("ActionsColumn component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ActionsColumn component: Missing required result prop");
    }

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {React.Children.map(children, (child, key) => (
                <React.Fragment key={key}>
                    {React.isValidElement(child) &&
                        React.cloneElement(child, {
                            result: result,
                            columnName: columnName,
                        })}
                </React.Fragment>
            ))}
        </Box>
    );
};

// * It has to be done via .defaultProps so disableSorting is passed openly to this component and can be read by TableContent
ActionsColumn.defaultProps = {
    disableSorting: true,
};

export default ActionsColumn;
export { ActionsColumnProps };
