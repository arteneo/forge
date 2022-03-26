import BatchSelectedType from "../../../components/Table/definitions/BatchSelectedType";
import QueryInterface from "../../../components/Table/definitions/QueryInterface";

interface BatchQueryInterface extends QueryInterface {
    selected: BatchSelectedType;
}

export default BatchQueryInterface;
