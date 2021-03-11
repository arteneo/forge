import ResultInterface from "@arteneo/forge/components/Table/definitions/ResultInterface";

// eslint-disable-next-line
type TableResultActionResolveType<T> = T | ((value: any, result: ResultInterface, field: string) => T);

export default TableResultActionResolveType;
