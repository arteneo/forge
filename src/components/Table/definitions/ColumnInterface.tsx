import ResultInterface from "../../../components/Table/definitions/ResultInterface";

interface ColumnInterface {
    // result should be added to props when rendering
    result?: ResultInterface;
    // columnName should be added to props when rendering
    columnName?: string;
    disableSorting?: boolean;
}

export default ColumnInterface;
