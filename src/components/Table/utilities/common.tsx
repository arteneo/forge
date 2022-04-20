import ColumnsInterface from "../definitions/ColumnsInterface";

export const getColumns = <T,>(names: undefined | T[], columns: ColumnsInterface): ColumnsInterface => {
    const _columns: ColumnsInterface = {};
    const columnNames = typeof names === "undefined" ? Object.keys(columns) : names;

    columnNames.forEach((columnName) => {
        if (typeof columnName !== "string") {
            throw new Error("Column name " + columnName + " not supported");
        }
        if (typeof columns[columnName] === "undefined") {
            throw new Error("Column name " + columnName + " not supported");
        }

        _columns[columnName] = columns[columnName];
    });

    return _columns;
};
