import BatchSelectedType from "@arteneo/forge/components/Table/definitions/BatchSelectedType";
import QueryInterface from "@arteneo/forge/components/Table/definitions/QueryInterface";

interface BatchQueryInterface extends QueryInterface {
    selected: BatchSelectedType;
}

export default BatchQueryInterface;
