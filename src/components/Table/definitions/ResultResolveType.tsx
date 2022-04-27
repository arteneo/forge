import ResultInterface from "../../../components/Table/definitions/ResultInterface";

// eslint-disable-next-line
type ResultResolveType<T> = T | ((value: any, result: ResultInterface, columnName: string) => T);

export default ResultResolveType;
