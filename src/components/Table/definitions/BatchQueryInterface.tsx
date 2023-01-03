import BatchSelectedType from "../../../components/Table/definitions/BatchSelectedType";
import QuerySortingInterface from "../../../components/Table/definitions/QuerySortingInterface";

interface BatchQueryInterface {
    sorting: QuerySortingInterface;
    ids: BatchSelectedType;
}

export default BatchQueryInterface;
