import ResultInterface from "@arteneo/forge/components/Table/definitions/ResultInterface";

interface TableResultActionInterface {
    // result is added to props by TableContent
    result?: ResultInterface;
    // field is added to props by TableContent
    field?: string;
}

export default TableResultActionInterface;
