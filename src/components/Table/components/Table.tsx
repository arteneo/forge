import React from "react";
import { TableProvider, TableProviderProps } from "../../../components/Table/contexts/Table";
import TableContent from "../../../components/Table/components/TableContent";
import { Optional } from "../../../utils/TypescriptOperators";

type TableProps = Optional<TableProviderProps, "children">;

const Table = ({ children, ...props }: TableProps) => {
    return <TableProvider {...props}>{children ?? <TableContent />}</TableProvider>;
};

export default Table;
export { TableProps };
